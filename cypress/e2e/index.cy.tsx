describe('test homepage', () => {
	it('check home page', () => {
		cy.visit('http://localhost:3000');
	});
	it('check scroll', () => {
		cy.scrollTo(0, 500);
	});
	it('click on a category', () => {
		cy.scrollTo(0, 0);
		cy.get('[data-cy="single-category"]')
			.eq(0)
			.click()
			.then(() => {
				cy.wait(8000);
				cy.url().should('include', 'products');
			});
	});

	it('click on single Product add to cart button', () => {
		cy.get('[data-cy="single-product-button"]').first().click();
	});

	it('click on single product', () => {
		cy.get('[data-cy="single-product"]')
			.eq(3)
			.click()
			.then(() => {
				cy.wait(5000);
			});
	});
	it('add to cart single product', () => {
		cy.get('[data-cy="single-product-add-to-cart-button"]').click();
	});

	it('open cart', () => {
		cy.get('[cy-data="show-cart"]').click();
	});

	it('increment quantity', () => {
		cy.get('[cy-data="increment-cart"]').first().click();
	});
	it('decrement quantity', () => {
		cy.get('[cy-data="decrement-cart"]').first().click();
	});
	it('remove product from cart', () => {
		cy.get('[cy-data="remove-cart"]').first().click();
	});
});
