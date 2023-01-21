# Python3 Virtual Environment Setup
python3 -m venv ./venv/
source venv/bin/activate
pip install -r requirements.txt
chmod u+x run_today_payment.sh
chmod u+x startup.sh
chmod u+x run.sh
# pip3 install -r requirements.txt
# Django Setup
python3 ./manage.py makemigrations
python3 ./manage.py migrate
