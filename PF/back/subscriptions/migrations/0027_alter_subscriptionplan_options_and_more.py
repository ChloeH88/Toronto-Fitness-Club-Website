# Generated by Django 4.1.3 on 2022-11-17 23:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0026_remove_usersubscription_start_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='subscriptionplan',
            options={'verbose_name': 'Gym Subscription Plan', 'verbose_name_plural': 'Gym Subscription Plans'},
        ),
        migrations.AlterModelOptions(
            name='usercard',
            options={'verbose_name': 'User payment card', 'verbose_name_plural': 'User payment cards'},
        ),
    ]
