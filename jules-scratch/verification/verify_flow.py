import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Register a new client user
        print("Navigating to registration page...")
        page.goto("http://localhost:3000/registro")

        # Wait for the page to load
        expect(page.get_by_role("heading", name="Crea tu cuenta")).to_be_visible()
        print("Registration page loaded.")

        page.get_by_label("Busco Cuidador").click()
        page.get_by_placeholder("Juan Pérez").fill("Test User")
        # Use a unique email for each run to avoid conflicts
        unique_email = f"testuser_{page.evaluate('Date.now()')}@example.com"
        page.get_by_placeholder("tu@email.com").fill(unique_email)
        print(f"Using email: {unique_email}")

        page.get_by_placeholder("+56 9 1234 5678").fill("+56998765432")
        page.get_by_placeholder("Comuna, Ciudad").fill("Santiago, Chile")
        page.get_by_label("Contraseña").first.fill("password123")
        page.get_by_label("Confirmar contraseña").fill("password123")
        page.get_by_label(re.compile("Acepto los Términos y Condiciones")).check()

        print("Submitting registration form...")
        page.get_by_role("button", name="Crear Cuenta").click()

        # 2. Verify login and redirection to dashboard
        print("Verifying redirection to dashboard...")
        expect(page.get_by_role("heading", name="Mi Dashboard")).to_be_visible(timeout=10000)
        print("Successfully logged in and redirected to dashboard.")

        # 3. Navigate to search page and filter
        print("Navigating to search page...")
        page.get_by_role("link", name="Buscar Cuidadores").click()
        expect(page.get_by_role("heading", name="Encuentra tu Cuidador Ideal")).to_be_visible()
        print("Search page loaded.")

        # Wait for caregivers to load
        expect(page.get_by_text("cuidadores encontrados")).to_contain_text(re.compile(r"\d+"))

        # 4. Favorite the first caregiver
        print("Favoriting a caregiver...")
        first_caregiver_card = page.locator("div.space-y-4 > div").first
        favorite_button = first_caregiver_card.get_by_role("button").first
        favorite_button.click()
        print("Caregiver favorited.")

        # 5. Navigate back to the dashboard
        print("Navigating back to dashboard...")
        page.get_by_role("link", name="Mi Dashboard").click()
        expect(page.get_by_role("heading", name="Mi Dashboard")).to_be_visible()

        # 6. Go to favorites tab and verify
        print("Checking favorites tab...")
        page.get_by_role("tab", name="Favoritos").click()

        # Wait for the content of the favorites tab to be visible
        favorites_content = page.locator('div[data-state="active"][role="tabpanel"]')
        expect(favorites_content.locator("div.space-y-4 > div")).to_be_visible()

        print("Favorites tab loaded. Taking screenshot...")
        # 7. Take screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)