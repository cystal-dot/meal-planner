const products = [
  {
    id: 1,
    name: "Vegetable-Tanned Leather Sneakers",
    href: "#",
    price: "$48",
    imageSrc:
      //   "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      "soup.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc: "pizza.jpeg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc: "tya-syu.jpeg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc: "salad.jpeg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc: "salad.jpeg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];
export default function List() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <a key={product.id} href={product.href} className="group">
            <div className="h-40 w-full overflow-hidden rounded-lg">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="object-cover object-center group-hover:opacity-75"
              />
            </div>

            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product.price}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
