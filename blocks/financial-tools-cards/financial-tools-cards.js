export default function decorate(block) {

    [...block.children].forEach((row, rowIndex) => {
        row.classList.add("connect-with-our-customer-heading");

        if (rowIndex === 1) {
            row.className = "connect-with-our-customer-card"
            row.children[0].classList.add("connect-with-our-customers")
            row.children[1].classList.add("connect-with-our-customers")
            row.children[2].classList.add("connect-with-our-customers")
        }



    });
}