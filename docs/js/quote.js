function quoteApp() {
    const currencyFormatter = new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    function formatNOK(value) {
        return currencyFormatter.format(value).replace('NOK', 'kr').replace(/\s+kr$/, ' kr');
    }
    return {
        customers: [
            { id: 1, name: 'Acme Corp' },
            { id: 2, name: 'Beta Ltd' },
            { id: 3, name: 'Charlie AS' }
        ],
        selectedCustomer: '',
        get selectedCustomerName() {
            const c = this.customers.find(c => c.id == this.selectedCustomer);
            return c ? c.name : '';
        },
        jobTitle: '',
        lineItems: [
            { description: '', qty: 1, unitType: 'stk', unitPrice: 0, longDescription: '' }
        ],
        clientMessage: '',
        internalNotes: '',
        linkJobs: false,
        linkInvoices: false,
        quoteNumber: 2,
        discount: 0,
        showDiscount: false,
        tax: 0,
        showTax: false,
        contractDisclaimer: 'This quote is valid for the next 30 days, after which values may be subject to change.',
        vatRate: 25, // Standard MVA in Norway
        get subtotal() {
            return this.lineItems.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0);
        },
        get vatTotal() {
            return this.lineItems.reduce((sum, item) => sum + (item.qty * item.unitPrice * this.vatRate / 100), 0);
        },
        get total() {
            let total = this.subtotal;
            if (this.showDiscount && this.discount > 0) {
                total = total * (1 - this.discount / 100);
            }
            if (this.showTax && this.tax > 0) {
                total = total * (1 + this.tax / 100);
            }
            // Add VAT
            total = total + this.vatTotal;
            return total;
        },
        formatNOK,
        addLineItem() {
            this.lineItems.push({ description: '', qty: 1, unitType: 'stk', unitPrice: 0, longDescription: '' });
        },
        removeLineItem(index) {
            this.lineItems.splice(index, 1);
        },
        duplicateLineItem(index) {
            const item = this.lineItems[index];
            const copy = { ...item };
            this.lineItems.splice(index + 1, 0, copy);
        },
        toggleDiscount() {
            this.showDiscount = !this.showDiscount;
        },
        toggleTax() {
            this.showTax = !this.showTax;
        },
        resetForm() {
            this.selectedCustomer = '';
            this.jobTitle = '';
            this.lineItems = [{ description: '', qty: 1, unitType: 'stk', unitPrice: 0, longDescription: '' }];
            this.clientMessage = '';
            this.internalNotes = '';
            this.linkJobs = false;
            this.linkInvoices = false;
            this.discount = 0;
            this.showDiscount = false;
            this.tax = 0;
            this.showTax = false;
            this.contractDisclaimer = 'This quote is valid for the next 30 days, after which values may be subject to change.';
        },
        submitQuote() {
            if (!this.selectedCustomer) {
                alert('Please select a customer.');
                return;
            }
            if (this.lineItems.length === 0) {
                alert('Please add at least one line item.');
                return;
            }
            alert('Quote saved! (This is a demo, no backend yet)');
            this.resetForm();
        },
        formatUnitPriceInput(event, index) {
            let value = event.target.value.replace(/\s/g, '');
            if (value === '') {
                this.lineItems[index].unitPrice = '';
                event.target.value = '';
                return;
            }
            // Only allow numbers and decimal
            value = value.replace(/[^\d.,]/g, '').replace(',', '.');
            let number = parseFloat(value);
            if (isNaN(number)) number = 0;
            this.lineItems[index].unitPrice = number;
            // Format visually as xxx xxx
            let parts = value.split('.');
            let intPart = parts[0];
            let decPart = parts[1] || '';
            intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            let formatted = intPart;
            if (decPart.length > 0) formatted += ',' + decPart;
            event.target.value = formatted;
        }
    }
}
