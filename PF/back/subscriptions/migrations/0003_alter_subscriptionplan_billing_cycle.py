# Generated by Django 4.1.3 on 2022-11-16 02:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0002_rename_subscription_subscriptionplan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscriptionplan',
            name='billing_cycle',
            field=models.CharField(choices=[('weekly', 'weekly'), ('monthly', 'monthly'), ('yearly', 'yearly')], max_length=10),
        ),
    ]