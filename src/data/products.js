const productImages = import.meta.glob(
  "../assets/images/Products/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const productDetails = [
  {
    name: "Audífonos inalámbricos",
    category: "Audio",
    price: 299,
    stock: 12,
    description:
      "Audífonos inalámbricos ideales para escuchar música, atender llamadas y disfrutar de tus contenidos favoritos.",
  },
  {
    name: "Teclado mecánico RGB",
    category: "Accesorios para PC",
    price: 399,
    stock: 8,
    description:
      "Teclado mecánico con iluminación RGB, ideal para gaming, trabajo y escritura diaria.",
  },
  {
    name: "Mouse inalámbrico",
    category: "Accesorios para PC",
    price: 249,
    stock: 15,
    description:
      "Mouse inalámbrico práctico y cómodo para trabajar, estudiar o navegar en tu computadora.",
  },
  {
    name: "Monitor Full HD",
    category: "Computación",
    price: 1599,
    stock: 5,
    description:
      "Monitor para mejorar tu espacio de trabajo, estudio o entretenimiento digital.",
  },
  {
    name: "Auriculares gaming",
    category: "Audio",
    price: 449,
    stock: 7,
    description:
      "Auriculares para videojuegos con diseño cómodo y sonido pensado para tus sesiones de juego.",
  },
  {
    name: "Teclado inalámbrico",
    category: "Accesorios para PC",
    price: 799,
    stock: 0,
    description:
      "Teclado inalámbrico para mantener un escritorio organizado y trabajar con mayor comodidad.",
  },
  {
    name: "Bocina Bluetooth",
    category: "Audio",
    price: 349,
    stock: 10,
    description:
      "Bocina portátil para escuchar música en casa o llevar tus canciones favoritas contigo.",
  },
  {
    name: "Webcam HD",
    category: "Computación",
    price: 499,
    stock: 6,
    description:
      "Cámara web para videollamadas, reuniones virtuales, clases y transmisiones.",
  },
  {
    name: "Monitor gaming",
    category: "Computación",
    price: 1899,
    stock: 3,
    description:
      "Monitor pensado para complementar una configuración gaming o un espacio de entretenimiento.",
  },
  {
    name: "Mouse pad gaming",
    category: "Accesorios para PC",
    price: 279,
    stock: 20,
    description:
      "Superficie para mouse que ayuda a mantener un área de juego y trabajo organizada.",
  },
  {
    name: "Audífonos Bluetooth",
    category: "Audio",
    price: 699,
    stock: 4,
    description:
      "Audífonos Bluetooth para escuchar audio de forma inalámbrica durante tus actividades diarias.",
  },
  {
    name: "Micrófono USB",
    category: "Audio",
    price: 549,
    stock: 9,
    description:
      "Micrófono USB para reuniones, grabaciones, clases en línea y creación de contenido.",
  },
  {
    name: "Hub USB multipuerto",
    category: "Accesorios para PC",
    price: 329,
    stock: 14,
    description:
      "Accesorio para ampliar las conexiones disponibles en equipos compatibles.",
  },
  {
    name: "Teclado gaming RGB",
    category: "Accesorios para PC",
    price: 749,
    stock: 2,
    description:
      "Teclado con estética gaming e iluminación para completar tu configuración de escritorio.",
  },
  {
    name: "Base para laptop",
    category: "Computación",
    price: 459,
    stock: 11,
    description:
      "Base para organizar tu escritorio y mejorar la posición de tu laptop durante el uso.",
  },
];

const products = Object.entries(productImages)
  .sort((a, b) => {
    const numberA = Number(
      a[0].match(/Product_(\d+)\.jpg$/)?.[1] ?? 0
    );
    const numberB = Number(
      b[0].match(/Product_(\d+)\.jpg$/)?.[1] ?? 0
    );

    return numberA - numberB;
  })
  .map(([path, image], index) => {
    const id = Number(
      path.match(/Product_(\d+)\.jpg$/)?.[1] ?? index + 1
    );

    const details = productDetails[id - 1];

    return {
      id,
      image,
      ...details,
      available: details.stock > 0,
    };
  })
  .filter((product) => product.name);

export default products;