'use strict';

const container = document.querySelector('.container');
const btnAdd = document.querySelector('.btn--add');
const btnSave = document.querySelector('.btn--save');
const saved = document.querySelector('.saved');

const elements = new Map();

function add() {
   const markup = `
      <div class="element">
         <input type="text" class="element__input element__input--1">
         <input type="text" class="element__input element__input--2">
         <button class="btn btn--up">&uarr;</button>
         <button class="btn btn--down">&darr;</button>
         <button class="btn btn--remove">x</button>
      </div>
   `;

   container.insertAdjacentHTML('beforeend', markup);
}

function moveUp(element) {
   const previous = element.previousElementSibling;

   if (!previous) return;

   container.insertBefore(element, previous);
}

function moveDown(element) {
   const next = element.nextElementSibling;

   if (!next) return;

   container.insertBefore(next, element);
}

function remove(element) {
   element.remove();
}

function save() {
   let result = '';

   const keys = container.querySelectorAll('.element__input--1');
   const vals = container.querySelectorAll('.element__input--2');

   for (let index = 0; index < keys.length; index++) {
      result += `"${keys[index].value}": "${vals[index].value}"`;

      if (index < keys.length - 1) result += ',';
   }

   saved.textContent = `{${result}}`;
}

btnAdd.addEventListener('click', add);
btnSave.addEventListener('click', save);

container.addEventListener('click', function (e) {
   const classList = e.target.classList;

   if (!classList.contains('btn')) return;

   const parent = e.target.parentElement;

   if (classList.contains('btn--up')) moveUp(parent);

   else if (classList.contains('btn--down')) moveDown(parent);

   else if (classList.contains('btn--remove')) remove(parent);
});


