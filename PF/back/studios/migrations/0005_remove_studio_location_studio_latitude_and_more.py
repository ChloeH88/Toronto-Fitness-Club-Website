# Generated by Django 4.1.3 on 2022-11-13 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0004_delete_currentloc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studio',
            name='location',
        ),
        migrations.AddField(
            model_name='studio',
            name='latitude',
            field=models.DecimalField(decimal_places=5, default=46.33, max_digits=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='studio',
            name='longitude',
            field=models.DecimalField(decimal_places=5, default=-79.8, max_digits=7),
            preserve_default=False,
        ),
    ]
