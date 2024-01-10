def get_formatted_date( start_date, end_date):
    """
    Formats a date range as a string based on the relationship between start_date and end_date.

    Args:
    start_date (datetime.date): The start date of the range.
    end_date (datetime.date): The end date of the range.

    Returns:
    str: A string representing the formatted date range.

    The function handles four scenarios:
    1. If the start and end dates are the same, return a single date.
    2. If the start and end dates are in the same month and year, return day1 - day2 month, year.
    3. If the start and end dates are in the same year but different months, return day1 month1 - day2 month2, year
    4. If the start and end dates are in different years, return a range with full dates for both.
    """
    # Case 1: If the dates are the same
    if start_date == end_date:
        return start_date.strftime("%d %b %Y")
    # Case 2: Same month and year
    if start_date.month == end_date.month and start_date.year == end_date.year:
        return f"{start_date.strftime('%d')} - {end_date.strftime('%d %b %Y')}"
     # Case 3: Same year, different month
    if start_date.year == end_date.year:
        return f"{start_date.strftime('%d %b')} - {end_date.strftime('%d %b %Y')}"
    # Case 4: Different years
    return f"{start_date.strftime('%d %b %Y')} - {end_date.strftime('%d %b %Y')}"