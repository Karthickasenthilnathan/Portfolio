
  (function(){
    const openBtn = document.getElementById('openContactBtn');
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeContactBtn');
    const closeAction = document.getElementById('closeActionBtn');

    // list of focusable selectors for simple focus trap
    const FOCUSABLE_SELECTORS = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    let lastFocused = null;

    function openModal(){
      lastFocused = document.activeElement;
      modal.setAttribute('aria-hidden','false');
      // focus first focusable inside modal
      const first = modal.querySelector(FOCUSABLE_SELECTORS);
      if(first) first.focus();
      // prevent body scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeModal(){
      modal.setAttribute('aria-hidden','true');
      // restore focus
      if(lastFocused) lastFocused.focus();
      // allow body scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    closeAction.addEventListener('click', closeModal);

    // close when overlay clicked
    modal.addEventListener('click', (e)=>{
      if(e.target.dataset && e.target.dataset.close === 'true'){
        closeModal();
      }
    });

    // ESC to close
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
        closeModal();
      }

      // simple focus trap inside modal when open
      if(e.key === 'Tab' && modal.getAttribute('aria-hidden') === 'false'){
        const focusables = Array.from(modal.querySelectorAll(FOCUSABLE_SELECTORS))
                                 .filter(el => el.offsetParent !== null);
        if(focusables.length === 0) return;

        const currentIndex = focusables.indexOf(document.activeElement);
        let nextIndex = currentIndex;
        if(e.shiftKey){
          nextIndex = (currentIndex - 1 + focusables.length) % focusables.length;
        } else {
          nextIndex = (currentIndex + 1) % focusables.length;
        }
        e.preventDefault();
        focusables[nextIndex].focus();
      }
    });
  })();



 


