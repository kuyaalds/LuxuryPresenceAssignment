function toggleMenu() {
    const menu = document.querySelector('.burger-menu');
    menu.classList.toggle('open');
}

function closePopup() {
    popup.style.display = 'none';
    popupOverlay.style.display = 'none';
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
const mapTexture = new THREE.TextureLoader().load('https://kuyaalds.github.io/LuxuryPresenceAssignment/css/images/map.jpg');
const mapGeometry = new THREE.PlaneGeometry(10, 10);
const mapMaterial = new THREE.MeshBasicMaterial({ map: mapTexture });
const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);

mapMesh.rotation.x = -Math.PI / 2;
scene.add(mapMesh);

camera.position.set(0, 0, 0);
camera.lookAt(0, 0, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('map-container').appendChild(renderer.domElement);

let angle = 5;
const radius = 8;
let isPaused = false;

function animate() {
    requestAnimationFrame(animate);
    if (!isPaused) {
        angle += 0.0001;
        camera.position.x = radius * Math.cos(angle);
        camera.position.z = radius * Math.sin(angle);
        camera.position.y = 10;
    }
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}

animate();

document.addEventListener('DOMContentLoaded', () => {
    const thoughtBubble = document.querySelector('.thought-bubble');
    const intro = document.querySelector('.intro');
    const logo = document.querySelector('.logo');
    const pins = document.querySelectorAll('.pin');
    const popup = document.getElementById('popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupImage = document.getElementById('popup-image');
    const closeBtn = document.getElementById('close-popup') || popup.querySelector('.close');

    let scrolledOnce = false;

    function closePopup() {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    }


    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            thoughtBubble.style.opacity = 0;
            setTimeout(() => {
                thoughtBubble.textContent = "Realtor for nearly 3 decades!";
                thoughtBubble.style.opacity = 1;
            }, 500);
        } else {
            thoughtBubble.style.opacity = 0;
            setTimeout(() => {
                thoughtBubble.textContent = "Hi, I am Marci Metzger!";
                thoughtBubble.style.opacity = 1;
            }, 500);
        }
    });


    window.addEventListener('scroll', () => {
        if (window.scrollY > 10 && !scrolledOnce) {
            logo.style.opacity = 0;
            scrolledOnce = true;

            setTimeout(() => {
                intro.classList.add('scrolled');
                logo.style.opacity = 1;
            }, 500);
        } else if (window.scrollY <= 10 && scrolledOnce) {
            logo.style.opacity = 0;
            scrolledOnce = false;

            setTimeout(() => {
                intro.classList.remove('scrolled');
                logo.style.opacity = 1;
            }, 500);
        }
    });



    pins.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = pin.getAttribute('data-image');
            popupImage.src = imgSrc;
            popup.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', closePopup);

    document.addEventListener('click', (e) => {
        if (
            popup.style.display === 'block' &&
            !popup.contains(e.target) &&
            !e.target.classList.contains('pin')
        ) {
            closePopup();
        }
    });

    popupOverlay.addEventListener('click', closePopup);
});
