/**
 * Smooth scrolls to a specific section ID, handling navigation if not on the home page.
 * @param sectionId The ID of the section to scroll to (e.g., 'services').
 * @param navigate The react-router-dom navigate function.
 * @param pathname The current pathname (e.g., location.pathname).
 */
export const scrollToSection = (
    sectionId: string,
    navigate: (path: string) => void,
    pathname: string
) => {
    const isHomePage = pathname === "/";
    const targetId = sectionId.replace("#", "");

    const scrollLogic = () => {
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80; // Approximate height of sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (isHomePage) {
        scrollLogic();
    } else {
        navigate("/");
        // Wait for navigation and mount
        setTimeout(() => {
            scrollLogic();
        }, 100);
    }
};
