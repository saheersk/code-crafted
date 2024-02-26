from celery import shared_task
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from decouple import config

from django.conf import settings


@shared_task
def send_otp_task(email, otp):

    FROM_EMAIL = config('FROM_EMAIL', default='')

    print("from email ===========", FROM_EMAIL, "==================")

    subject = 'Your OTP Verification Code'
    message = f'Your OTP code is: {otp}'
    from_email = FROM_EMAIL
    recipient_list = [email]

    msg = Mail(
        from_email=from_email,
        to_emails=recipient_list,
        subject=subject,
        plain_text_content=message
    )

    try:
        sg = SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
        response = sg.send(msg)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(str(e))
