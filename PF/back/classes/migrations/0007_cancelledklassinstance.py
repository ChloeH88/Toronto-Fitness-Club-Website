# Generated by Django 4.1.3 on 2022-11-18 13:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0006_klassinstance_num_students'),
    ]

    operations = [
        migrations.CreateModel(
            name='CancelledKlassInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('num_students', models.PositiveIntegerField()),
                ('base_klass', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='classes.baseklass')),
            ],
        ),
    ]