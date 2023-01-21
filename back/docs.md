# 📃 Project Documentation
### ***Please manually create superuser via `python3 manage.py cretesuperuser` after running `startup.sh`**
### ***Note all time is in UTC timezone, so 5 hours ahead of Toronto time.**

## Contents:
1. postman collection: `postman.json`
2. Django model explanation `tfc_models.png`
3. Admin page instruction
4. All API endpoints
5. payment script to pay users due today
   
## 1. All Postman API can be found at `postman.json` file.

## 2. Django models
Please refer to `tfc_models.png` for our model diagram.
Written explanation:
- 1 model in `accounts` app:
  - `User` model: general information about a registered user.

- 3 models in `studios` app:
  - `Studio` model: general info about a studio, and it has one-to-many relationship to `Image` and `Amenity` model -- since a studio can have multiple images and amenities.

- 4 models in `classes` app:
  -  `BaseKlass` model: general info about a class (like start and end date, class name, in which studio), and we have another model `KlassInstance` that contains every weekly instance of `BaseKlass`.
  - `Enrolled` model stores every user's enrollment to every `KlassInstance`
  - `CancelledKlassInstance` stores `KlassInstance` that are cancelled.

- 4 models in `subscriptions` app
    - `SubscriptionPlan` model contains gym's all plans, each with its price and billing cycle.
    - `UserSubscription` model contains info about user subscribes to which plan. (user can only subscribe to one plan, so one-to-one relation to `User` model)
    - `UserCard` model is one-to-one to user, contains user's current payment card.
    - `UserPaymentHistory` contains user's every past payment.
## 3. Admin Page Instruction
### Class
<!-- If you check the box `add_all_instances`, it'll create all class instances between `start_date` and `end_date`. -->

1. Create classes that recur between start and end date:
   <!-- • Remember to **check `add_all_instance` checkbox** -->
   • **No need to enter information in `Class Instance` section.**
   • After save, go back to this page, and you'll see all class instances that are auto-generated.

2. Cancel one class instance:
    <!-- • **uncheck `add_all_instance` checkbox** -->
    • Delete it from `Class Instance` section.
    • You can see it in `Cancelled Class Instance` section.

3. Cancel all future occurrence of a class:
    • Modify `end_date` in `Class` section on top

Note: If you change a class's `start_date`, `start_time`, `end_time`, **all cancelled classes will be removed, and you have to manually cancel classes again** -- because as a not very intelligent server, I'm not sure if you want to bring back a cancelled class if you change date/time.

4. Bring back a cancelled class instance:
   • Ensure `end_date` in `Class` section on top is after this class instance date
   • Delete the cancelled class from `Cancelled Class Instance` section
   • save

### Others
Other admin pages are pretty straightforward, please follow format in help text to enter information.

## 4. Endpoints

### `/`
##### Methods: `GET`
This is the default endpoint. When we implement our site, this will be the landing page.

### • Accounts section
### `/accounts/register/`
##### Methods: `POST`
##### Payload:
- `username` -  The username of the user.
- `email` -  The email of the user.
- `first_name` -  The first name of the user.
- `last_name` -  The last name of the user.
- `password` - The user's password.
- `phone_number` -  The phone number of the user. (xxx-xxx-xxxx)
- `avatar` -  (file) The avatar of the user.

A register page. This is where users can register for an account. This endpoint is accessible to anyone.


### `/accounts/login/`
##### Methods: `POST`
##### Payload:
- `username` -  The username of the user.
- `password` - The user's password.

A login page. Posting with an appropriate payload will log that specified user in.

### `/accounts/logout/`
##### Methods: `GET`

A logout page. Once user successful logout, page will display a message saying "You have been logged out."

### `/accounts/edit/`
##### Methods: `PATCH`, `PUT`
##### Payload:
- `username` -  The username of the user.
- `email` -  The email of the user.
- `first_name` -  The first name of the user.
- `last_name` -  The last name of the user.
- `phone_number` -  The phone number of the user.
- `avatar` -  The avatar of the user.

A page where users can edit their account information. This endpoint is accessible to logged in users.


### • Studio section
### `/studios/list/`
##### Methods: `GET`
##### Parameter:
- `lat`: latitude of a location that user wants to sort studios
- `lon`: longitude of a location that user wants to sort studios
- `keyword` [optional]: the keyword that user wants to search for
- `criterion` [optional]: the criterion user chose to search for. Options: `studio name`, `amenity`, `class name`, `coach name`

A list of all studios based on geographical proximity to a specific location, sorted by closest to farthest. 

If both `criterion` and `keyword` are provided, we only list studios that satisfied search and filter requirements, but we still list them by geographical proximity. 

Users can see this page without logging in. 
(Directly get `lat` and `lon` from front-end via geolocation API)

### `/studios/{{studio_id}}/`
##### Methods: `GET`
##### Parameter:
- `lat`: latitude of user
- `lon`: longitude of user
  
A specific studio: including name, phone number, address, location, amenities, link to get direction from user's desired location to the studio. (Other information like classes can be accessed by endpoint in Class section, so front-end will send 2 requests to get all information of a studio). Users can see this page without logging in.


<!-- ### `/studios/list/search/`
##### Methods: `GET`
##### Parameter:
- `keyword`: the keyword that user wants to search for
- `criterion`: the criterion user chose to search for, e.g. studio name
(criteria include `studio name`, `amenity`, `class name`, `coach name`)

A list of all studios specified by search `criterion` and `keyword`. Users can see this page without logging in. -->

### • Class section
### `/classes/schedule/{{studio_id}}/`
##### Methods: `GET`

- `studio_id`: id of the studio user is interested in seeing the schdule

List the available class schedule (no past/cancelled class) of the studio specified by `studio_id`. User can use this API without logging in.

### `/classes/search/`
##### Methods: `GET`
##### Parameter:

- `criterion`: one of ["coach name", "class name", "date", "date range", "time range"]
- `keyword`/(`start_var` and `end_var`): the keyword that user wants to search for, if user want to search by **criterion** "coach name", "clase name" and "date", then `keyword` is required, otherwise `start_var` (`YYYY-MM-DD` for date, `%H:%M` for time) and `end_var` are required
- `studio_id`: id of the studio user is interested in filtering the schedule

Filter the class schedule of the studio specified by `studio_id` by `criterion` and `keyword` or `start_var`  and `end_var`. User can use this API without logging in.
For DATE RANGE search, we would return the classes that availiable in the date range specified by `start_var` and `end_var` (not include passed courses). For TIME RANGE search, we would return the classes that availiable in the time range specified by `start_var` and `end_var`(not include passed courses).

### `/classes/enroll/`
##### Methods: `POST`
##### Payload:
- `class_id`: the id of the class (BaseKlass id, find out what ids are avilable in `Classes` admin site) to be enrolled in
- `date`: The date of the first class instance that refers to `class_id` user wants to enroll. "YYYY-MM-DD". should be at least today (enforced by frontend). 
- `all`: True if user wants to enroll all future occurrences after date, False if only one specific instance

Enroll the current logged-in user into the class instances referred by `class_id`. If a class instance has no capacity, user won't be able to perform enroll operation (enforced by both back-end and front-end, front-end: disable enroll button for this class instance)

### `/classes/drop/`
##### Methods: `POST`
##### Payload:
- `class_id`: the id of the class (BaseKlass id, find out what ids are avilable in `Classes` admin site) to be dropped out
- `date`: The date of the first class instance user wants to drop. "YYYY-MM-DD"
- `all`: (Optional) If you also want to drop all classes after date.

Drop the current logged-in user from the class specified by `class_id`.

### `/classes/user/future/schedule/`
##### Methods: `GET`

List the future class schedule (classes that start after now) of the current logged-in user.

### `/classes/user/past/schedule/`
##### Methods: `GET`

List the past enrollment (classes that start before or = now) of the current logged-in user.


## • Subscription section
For this part, please follow this order
1. create subscription plans in admin
2. add a payment card for the user
3. subscribe to a plan
4. run payment shell script (please add payment card before run script)

### `/subscriptions/card/add/`
##### Methods: `POST`
##### Payload:
- `card_num`: card number, max length is 16 digits
- `cardholder`: name of cardholder
- `expiry_date`: expiration date, format: yyyy-mm-dd
- `CVV`: CVV of card, 3 digits

Current logged-in user adds a payment card for paying subscription plans. 
If user already has a card, there will be error message to instruct users to update instead of adding. Then, please use `/subscriptions/card/update/` if you want to update your card info. (But actually front end will disable user to add a card if they already have one, front end will only show update prompt).

### `/subscriptions/card/update/`
##### Methods: `GET`, `PUT`, `PATCH`
##### Payload:
- `card_num`: card number, max length is 16 digits
- `cardholder`: name of cardholder
- `expiry_date`: expiration date, format: yyyy-mm-dd
- `CVV`: CVV of card, 3 digits

`GET` request shows current logged-in user's current payment card info.
`PUT` or `PATCH` request updates current logged-in user's payment card for paying plans.

### `/subscriptions/add/`
##### Methods: `GET`, `POST`
##### Payload:
- `plan_id`: `id` of the plan that user wants to subscribe

`GET` request shows all subscription plans.
`POST` request is where current logged-in user subscribes to a specific plan, and user will be charged immediately (no need to run `run_today_payment` script). If user has no payment card, prompt error message to instruct users to add card first.

If user already has a plan, there will be error message to instruct users to update instead of adding. Then, please use `/subscriptions/update/` if you want to update your plan. (But actually front end will disable user to add a plan if they already have one, front end will only show update prompt).

### `/subscriptions/update/`
##### Methods: `GET`, `PUT`, `PATCH`
##### Payload:
- `plan_id`: `id` of the plan that user wants to subscribe
- `cancelled`: (optional) if provided, will cancel user's current plan.

`GET` request shows logged-in user's current subscription plan.
`PUT` and `PATCH` request is where current logged-in user subscribes to a new specific plan, or cancels a current plan. If user subscribes to a new plan, user will be charged at the end of current billing period with new plan price. If cancelling, won't be charged anymore, and all enrolled classes after cancelling will be removed. (can check paymentsHistory and see `next_billing_date`)


### `/subscriptions/paymentsHistory/`
##### Methods: `GET`

List current logged-in user's all past payments (amount, billing datetime, card info), as well as the next billing date and amount. Note all time is in utc timezone, so 5 hours ahead of Toronto time.


## 5. Payment Script
`sh run_today_payment.sh` is the command to pay all users that have a payment due date today. 

But because first payment is paid immediately after submission, all users' next payment will be at least one month later. 

In interview, we can change code in our file (let today = a future date), and show how to run the script to pay for users that due on that future date.