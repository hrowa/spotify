# Generated by Django 3.1.7 on 2021-03-16 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='vote_to_skip',
            new_name='votes_to_skip',
        ),
        migrations.AlterField(
            model_name='room',
            name='host',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
