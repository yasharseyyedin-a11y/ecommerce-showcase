# views.py
import json
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY
class CreateCheckoutSession(APIView):
    def post(self, request):
        try:
            print("creating session");
            data = json.loads(request.body)
            line_items_data = data.get('line_items', [])
            customer_details = data.get('customerDetails', {})

            # Construct line_items array for Stripe Checkout API
            line_items = []
            for item in line_items_data:
                line_items.append({
                    'price_data': {
                        'currency': item['price_data']['currency'],
                        'product_data': {
                            'name': item['price_data']['product_data']['name'],
                        },
                        'unit_amount': item['price_data']['unit_amount'],
                    },
                    'quantity': item['quantity'],
                })

            # Use customer details in metadata or customer_email for Stripe session
            metadata = {
                'email': customer_details.get('email', ''),
            }
            print("creating metadata:", metadata);

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card', 'affirm', 'afterpay_clearpay', 'alipay', 'bancontact', 'cashapp', 'crypto',
                                      'eps', 'giropay', 'ideal', 'klarna', 'link', 'mb_way'],
                mode='payment',
                line_items=line_items,
                metadata=metadata,  # Attach customer info metadata
                customer_email=customer_details.get('email', None),  # Optional: to pefill Stripe receipt email etc.
                success_url=request.build_absolute_uri('http://localhost:4200/success'),
                cancel_url=request.build_absolute_uri('http://localhost:4200/cancel'),
            )
            print("session created:", checkout_session.id);
            return Response({'sessionURL': checkout_session.url})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


