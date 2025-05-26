from .models import Register

def login_status(request):
    user_id = request.session.get('user_id')
    user = None
    if user_id:
        try:
            user = Register.objects.get(id=user_id)
        except Register.DoesNotExist:
            user = None
    return {
        'is_logged_in': user is not None,
        'logged_username': user.username if user else ''
    }
