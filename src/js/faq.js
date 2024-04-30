// import { createAccordion, handleClick } from './accordion';
import { createAccordion, handleAccordionClick } from './accordion';
import { faqAccordion } from './refs';

const options = {
  containerClass: '.faq-items',
  elementClass: 'faq-item',
  triggerClass: 'faq-acordeon-btn',
  panelClass: 'faq-descr',
};

const clickOptions = {
  btnClass: '.faq-acordeon-btn',
  iconClass: '.modal-btn-icon',
};
// faqAccordion.addEventListener('click', event =>
//   handleClick(event, clickOptions)
// );

// const faqAccordionTriggers = faqAccordion.querySelectorAll('.faq-acordeon-btn');
const faqAccordionTriggers = faqAccordion.querySelectorAll(
  `.${options.triggerClass}`
);
faqAccordionTriggers.forEach(accordionTrigger => {
  accordionTrigger.addEventListener('click', event => {
    handleAccordionClick(event, clickOptions);
  });
});

createAccordion(options);
