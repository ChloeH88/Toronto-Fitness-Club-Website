# Generated by Django 4.1.3 on 2022-12-06 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0008_alter_cancelledklassinstance_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseklass',
            name='name',
            field=models.CharField(max_length=200),
        ),
    ]