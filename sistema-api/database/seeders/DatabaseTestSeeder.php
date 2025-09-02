<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Nota;
use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class DatabaseTestSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@localhost.com',
            'password' => Hash::make('Admin1234!'),
            'avatar' => 'default.jpg',
            'role' => 'admin',
            'email_verified_at' => Carbon::now(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $categoriasData = [
            ['nombre' => 'Frontend'],
            ['nombre' => 'Backend'],
            ['nombre' => 'DevOps'],
            ['nombre' => 'Bases de Datos'],
            ['nombre' => 'APIs'],
            ['nombre' => 'Metodologías Ágiles'],
            ['nombre' => 'Ciberseguridad'],
            ['nombre' => 'Inteligencia Artificial'],
            ['nombre' => 'Testing'],
            ['nombre' => 'UX/UI']
        ];
        foreach ($categoriasData as $categoriaData) {
            Categoria::create($categoriaData);
        }

        $categorias = Categoria::all();
        $frontend_id = $categorias->where('nombre', 'Frontend')->first()->id;
        $backend_id = $categorias->where('nombre', 'Backend')->first()->id;
        $devops_id = $categorias->where('nombre', 'DevOps')->first()->id;
        $databases_id = $categorias->where('nombre', 'Bases de Datos')->first()->id;
        $apis_id = $categorias->where('nombre', 'APIs')->first()->id;
        $agile_id = $categorias->where('nombre', 'Metodologías Ágiles')->first()->id;
        $security_id = $categorias->where('nombre', 'Ciberseguridad')->first()->id;
        $ai_id = $categorias->where('nombre', 'Inteligencia Artificial')->first()->id;
        $testing_id = $categorias->where('nombre', 'Testing')->first()->id;
        $uxui_id = $categorias->where('nombre', 'UX/UI')->first()->id;

        $notasData = [
            [
                'titulo' => 'Solucionar un bug en producción',
                'contenido' => 'El cliente reportó un error crítico en el login. Resultó ser un problema con la caché. Borrar la caché y listo.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id, $devops_id]
            ],
            [
                'titulo' => 'Reunión de Stand-Up',
                'contenido' => 'Actualizar al equipo sobre el progreso del sprint. Mencioné el avance en la nueva feature y el bug resuelto.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(7),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$agile_id]
            ],
            [
                'titulo' => 'Investigación sobre nuevo framework',
                'contenido' => 'Explorar las ventajas y desventajas de Vue.js 3 para un proyecto futuro. Investigar la composición API y la gestión de estado.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$frontend_id]
            ],
            [
                'titulo' => 'Configuración de entorno de desarrollo',
                'contenido' => 'Instalar Docker y configurar los contenedores para la base de datos y el servidor web del proyecto. Documentar los pasos.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$devops_id, $databases_id]
            ],
            [
                'titulo' => 'Integración de pasarela de pago',
                'contenido' => 'Completar la integración con la API de Stripe para manejar pagos recurrentes. Falta probar los webhooks.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id, $apis_id]
            ],
            [
                'titulo' => 'Aprender Git avanzado',
                'contenido' => 'Completar el curso sobre rebase, cherry-pick y bisect para mejorar el manejo del historial del repositorio.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(30),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$devops_id]
            ],
            [
                'titulo' => 'Conceptos clave de REST vs GraphQL',
                'contenido' => 'Analizar cuándo usar cada arquitectura de API y sus diferencias en cuanto a flexibilidad y rendimiento.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$apis_id]
            ],
            [
                'titulo' => 'Introducción a Machine Learning',
                'contenido' => 'Leer el libro sobre los fundamentos del ML. Empezar a trabajar con un dataset de ejemplo en Python con scikit-learn.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$ai_id]
            ],
            [
                'titulo' => 'Principios de diseño UX',
                'contenido' => 'Estudiar sobre la Ley de Fitts y la Ley de Hick para aplicar mejores principios de usabilidad en la interfaz de usuario.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(60),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$uxui_id]
            ],
            [
                'titulo' => 'Implementar pruebas unitarias',
                'contenido' => 'Escribir tests con Jest para los componentes de React del front-end. Asegurar una cobertura del 80%.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$frontend_id, $testing_id]
            ],
            [
                'titulo' => 'Preparar presentación para el equipo',
                'contenido' => 'Crear slides sobre el último sprint. Demostrar las nuevas funcionalidades y el impacto en el rendimiento.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(3),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$agile_id]
            ],
            [
                'titulo' => 'Optimizar consultas a la base de datos',
                'contenido' => 'Analizar las consultas lentas con `explain analyze` y crear índices para las tablas de productos y usuarios.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$databases_id]
            ],
            [
                'titulo' => 'Revisar Pull Requests del equipo',
                'contenido' => 'Dar feedback constructivo sobre el código. Asegurarse de que sigan las convenciones y que los tests pasen.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$devops_id]
            ],
            [
                'titulo' => 'Refactorizar código legado',
                'contenido' => 'Separar la lógica de negocio de la capa de presentación. Usar el patrón de repositorio para limpiar el controlador.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id]
            ],
            [
                'titulo' => 'Probar nuevas herramientas de seguridad',
                'contenido' => 'Evaluar herramientas como OWASP ZAP para realizar un escaneo básico de vulnerabilidades en la aplicación.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$security_id]
            ],
            [
                'titulo' => 'Diseñar API para microservicio',
                'contenido' => 'Planificar los endpoints para el nuevo servicio de notificaciones. Usar un enfoque de diseño "API-first".',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$apis_id, $backend_id]
            ],
            [
                'titulo' => 'Actualizar dependencias de Laravel',
                'contenido' => 'Ejecutar `composer update` y revisar los cambios. Asegurarse de que no se rompan las funcionalidades existentes.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id, $devops_id]
            ],
            [
                'titulo' => 'Solucionar error de CORS en el front-end',
                'contenido' => 'El front-end no puede hacer peticiones a la API. Configurar los encabezados CORS en el servidor.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$frontend_id, $apis_id]
            ],
            [
                'titulo' => 'Aprender a usar Redis para caché',
                'contenido' => 'Explorar los comandos básicos de Redis y cómo integrarlo con Laravel para mejorar la velocidad de la aplicación.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$databases_id, $backend_id]
            ],
            [
                'titulo' => 'Diseño de base de datos para e-commerce',
                'contenido' => 'Crear el esquema de la base de datos para el carrito de compras, productos y usuarios. Considerar las relaciones.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$databases_id, $backend_id]
            ],
            [
                'titulo' => 'Investigar sobre Server-Side Rendering',
                'contenido' => 'Analizar la implementación de SSR con frameworks como Next.js o Nuxt.js para mejorar el SEO.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(90),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$frontend_id]
            ],
            [
                'titulo' => 'Configurar CI/CD con GitHub Actions',
                'contenido' => 'Crear un flujo de trabajo para que, al hacer push a la rama principal, se ejecuten los tests y se despliegue automáticamente.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$devops_id, $testing_id]
            ],
            [
                'titulo' => 'Protocolos de autenticación OAuth 2.0',
                'contenido' => 'Entender los diferentes flujos (implicit, authorization code) y cómo usarlos para proteger una API.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$security_id, $apis_id]
            ],
            [
                'titulo' => 'Entender los algoritmos de Machine Learning',
                'contenido' => 'Repasar los fundamentos de regresión lineal, árboles de decisión y K-means. Comprender sus casos de uso.',
                'favorita' => false,
                'fecha_expiracion' => Carbon::now()->addDays(45),
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$ai_id]
            ],
            [
                'titulo' => 'Automatizar pruebas de integración',
                'contenido' => 'Utilizar Cypress para crear pruebas de extremo a extremo que simulen el flujo de un usuario en el sitio web.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$testing_id, $frontend_id]
            ],
            [
                'titulo' => 'Diseño de un dashboard para admin',
                'contenido' => 'Crear wireframes y prototipos para la interfaz de administración. Enfocarse en la usabilidad y la visualización de datos.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$uxui_id]
            ],
            [
                'titulo' => 'Optimizar tiempo de carga de la web',
                'contenido' => 'Minimizar archivos CSS y JS, comprimir imágenes y utilizar un CDN para mejorar el rendimiento.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$frontend_id, $devops_id]
            ],
            [
                'titulo' => 'Aprender sobre WebSockets',
                'contenido' => 'Implementar una funcionalidad de chat en tiempo real usando WebSockets y el paquete Laravel Echo.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id]
            ],
            [
                'titulo' => 'Estudiar sobre inyección de dependencias',
                'contenido' => 'Comprender el principio de inversión de control y cómo el contenedor de servicios de Laravel lo implementa.',
                'favorita' => false,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$backend_id]
            ],
            [
                'titulo' => 'Auditoría de seguridad',
                'contenido' => 'Revisar las dependencias del proyecto con Snyk y actualizar las que tengan vulnerabilidades conocidas.',
                'favorita' => true,
                'fecha_expiracion' => null,
                'uuid' => (string) \Illuminate\Support\Str::uuid(),
                'categorias' => [$security_id, $devops_id]
            ],
        ];

        foreach ($notasData as $notaData) {
            $categoriasParaAsociar = $notaData['categorias'];
            unset($notaData['categorias']);

            $nota = Nota::create($notaData);
            $nota->categorias()->attach($categoriasParaAsociar);
        }
    }
}
