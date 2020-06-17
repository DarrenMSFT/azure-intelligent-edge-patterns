# Generated by Django 3.0.4 on 2020-06-10 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cameras', '0019_auto_20200608_1030'),
    ]

    operations = [
        migrations.AddField(
            model_name='part',
            name='name_lower',
            field=models.CharField(default='<django.db.models.fields.charfield>', max_length=200),
        ),
        migrations.AlterUniqueTogether(
            name='part',
            unique_together={('name_lower', 'is_demo')},
        ),
    ]
