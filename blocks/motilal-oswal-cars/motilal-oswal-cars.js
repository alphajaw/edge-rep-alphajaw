// export default function decorate(block) {
//     const connectwithourcustomer = document.createElement('div');
//     connectwithourcustomer.className = 'connect-with-our-customer-heading';
// }
export default function decorate(block) {

    [...block.children].forEach((row, rowIndex) => {
        row.classList.add("connect-with-our-customer-cards");
       
            row.children[0].classList.add("connect-with-our-customer-cards-img")
        
     
        
            row.children[1].classList.add ("connect-with-our-customer-text")
        


    });
}