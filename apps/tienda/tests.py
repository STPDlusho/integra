from django.test import TestCase
from .models import Producto, Categoria, TipoAnimal

class ProductoTest(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(id_categoria=1, nombre_categoria="comida")
        self.tipo_animal = TipoAnimal.objects.create(id_tipoA=1, nombre_tipoA="hamster")

    def test_str_method(self):
        producto = Producto(
            sku=1,
            nombre="hola",
            precio=1000,
            cantidad=10,
            id_categoria=self.categoria,
            id_tipoA=self.tipo_animal,
            proveedor="Proveedor A",
            descripcion="holaspor2",
            imagen_url="imagenesProducto/XD.jpg"
        )
        self.assertEqual(str(producto), "N° 1 - Stock: 10 - nombre: nose")

    def test_creating_producto(self):
        producto = Producto.objects.create(
            sku=2,
            nombre="Tablet",
            precio=500,
            cantidad=20,
            id_categoria=self.categoria,
            id_tipoA=self.tipo_animal,
            proveedor="Proveedor B",
            descripcion="Tablet de gama media",
            imagen_url="imagenesProducto/tablet.jpg"
        )
        self.assertEqual(producto.sku, 2)
        self.assertEqual(producto.nombre, "Tablet")
        self.assertEqual(producto.precio, 500)
        self.assertEqual(producto.cantidad, 20)
        self.assertEqual(producto.id_categoria, self.categoria)
        self.assertEqual(producto.id_tipoA, self.tipo_animal)
        self.assertEqual(producto.proveedor, "Proveedor B")
        self.assertEqual(producto.descripcion, "Tablet de gama media")
        self.assertEqual(producto.imagen_url, "imagenesProducto/tablet.jpg")
