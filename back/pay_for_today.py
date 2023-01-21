#!/usr/bin/env python

from subscriptions.serializers import *
import datetime

s = UserPaymentHistorySerializer()
today = datetime.datetime.strptime('2022-12-18', '%Y-%m-%d').date()
# today = datetime.date.today()
s.makePayment(today=today)

