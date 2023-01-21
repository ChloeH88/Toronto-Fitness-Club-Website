# Python3 Virtual Environment Setup
python -m venv ./venv/
source venv/scripts/activate
pip install -r requirements.txt
# Django Setup
python ./manage.py makemigrations
python ./manage.py migrate
