document.addEventListener('DOMContentLoaded', (event) => {
    const oneRing = document.getElementById('one-ring');
    
    oneRing.addEventListener('click', () => {
        document.body.style.transition = 'filter 2s';
        document.body.style.filter = 'invert(1)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 2000);
    });

    // Efecto de desvanecimiento para los elementos de estudio
    const studyItems = document.querySelectorAll('.study-item');
    
    const fadeInOptions = {
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 1s, transform 1s';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);

    studyItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        fadeInObserver.observe(item);
    });
    document.addEventListener('DOMContentLoaded', () => {
        const footer = document.querySelector('.lava-footer');
        const lavaFlows = document.querySelectorAll('.lava-flow');
    
        footer.addEventListener('mousemove', (e) => {
            const footerRect = footer.getBoundingClientRect();
            const mouseX = e.clientX - footerRect.left;
            const mouseY = e.clientY - footerRect.top;
    
            lavaFlows.forEach((flow, index) => {
                const speed = 0.05 - (index * 0.01);
                const x = (mouseX - footerRect.width / 2) * speed;
                const y = (mouseY - footerRect.height / 2) * speed;
                flow.style.transform = `translate(${x}px, ${y}px) rotate(${x * y / 1000}deg)`;
            });
        });
    
        footer.addEventListener('mouseleave', () => {
            lavaFlows.forEach((flow) => {
                flow.style.transform = 'translate(0, 0) rotate(0deg)';
            });
        });
    });
    
    
});

