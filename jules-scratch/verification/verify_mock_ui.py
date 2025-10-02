import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Navigate to the login page
        print("Navigating to login page...")
        page.goto("http://localhost:3000/login")

        # Wait for the page to load
        expect(page.get_by_role("heading", name="Inicia Sesión")).to_be_visible()
        print("Login page loaded.")

        # 2. Log in as the mock user
        page.get_by_placeholder("tu@email.com").fill("carolina.perez@email.com")
        page.get_by_placeholder("••••••••").fill("demo123")

        print("Submitting login form...")
        page.get_by_role("button", name="Ingresar").click()

        # 3. Verify redirection to dashboard
        print("Verifying redirection to dashboard...")
        expect(page.get_by_role("heading", name="Mi Dashboard")).to_be_visible(timeout=10000)
        print("Successfully logged in and redirected to dashboard.")

        # 4. Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)