from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from emp.models import Company
from events.models import Event, GalleryImage, Testimonial
from emp.templatetags.helper import RATING
import json


@csrf_exempt
def homepage_data(request):
    """
    API endpoint to get homepage data including companies, gallery images, 
    testimonials, and events - matching the react-django implementation
    """
    if request.method == 'GET':
        data = {}
        
        # Companies for homepage - matching the original index view
        companies = Company.objects.filter(
            rating=RATING['DISPLAY_ON_HOMEPAGE'], 
            status=True
        )[:8]
        
        companies_data = []
        for company in companies:
            companies_data.append({
                'name': company.name,
                'description': company.description or f"Leading company in {company.domain.name if company.domain else 'technology'}",
                'logo': company.logo.url if company.logo else '',
                'website': company.website or ''
            })
        
        # Gallery images for homepage
        gallery_images = GalleryImage.objects.filter(
            display_on_homepage=True,
            active=True
        )[:8]
        
        gallery_data = []
        for img in gallery_images:
            gallery_data.append({
                'image': img.image.url if img.image else '',
                'title': img.title or 'Gallery Image',
                'alt': img.title or 'Gallery Image'
            })
        
        # Testimonials for homepage
        testimonials = Testimonial.objects.filter(
            display_on_homepage=True,
            active=True
        )[:4]
        
        testimonials_data = []
        for testimonial in testimonials:
            testimonials_data.append({
                'name': testimonial.name,
                'about': testimonial.about,
                'desc': testimonial.desc,
                'location': testimonial.location or '',  # Video URL
                'display_on_homepage': testimonial.display_on_homepage,
                'active': testimonial.active
            })
        
        # Events for homepage (both upcoming and past)
        upcoming_events = Event.objects.filter(
            show_on_homepage=True,
            status=True,
            start_date__gte=timezone.now().date()
        ).order_by('start_date')[:3]
        
        past_events = Event.objects.filter(
            show_on_homepage=True,
            status=True,
            end_date__lt=timezone.now().date()
        ).order_by('-end_date')[:3]
        
        upcoming_events_data = []
        for event in upcoming_events:
            upcoming_events_data.append({
                'name': event.name,
                'formatted_start_date': event.start_date.strftime('%b %d, %Y'),
                'formatted_end_date': event.end_date.strftime('%b %d, %Y'),
                'description': event.description or f"Event: {event.name}"
            })
        
        past_events_data = []
        for event in past_events:
            past_events_data.append({
                'name': event.name,
                'formatted_start_date': event.start_date.strftime('%b %d, %Y'),
                'formatted_end_date': event.end_date.strftime('%b %d, %Y'),
                'description': event.description or f"Event: {event.name}"
            })
        
        data = {
            'companies': companies_data,
            'gallery_images': gallery_data,
            'testimonials': testimonials_data,
            'upcoming_events': upcoming_events_data,
            'past_events': past_events_data
        }
        
        return JsonResponse(data)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)