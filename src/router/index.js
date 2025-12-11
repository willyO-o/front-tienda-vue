import { createRouter, createWebHistory } from 'vue-router'

import { hasRole } from '@/helpers/permisosHelper';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: () => import('@/modules/public/views/PublicLayoutView.vue'),
      children: [
        {
          path: '',
          name: 'Inicio',
          component: () => import('@/modules/public/views/InicioView.vue')
        },
        {
          path: '/tienda',
          name: 'Tienda',
          component: () => import('@/modules/public/views/TiendaView.vue')
        },
        {
          path: 'contacto',
          name: 'Contacto',
          component: () => import('@/modules/public/views/ContactoView.vue')
        },
        {
          path: 'quienes-somos',
          name: 'QuienesSomos',
          component: () => import('@/modules/public/views/QuienesSomosView.vue')
        },
        {
          path: '/producto/:id',
          name: 'Producto',
          component: () => import('@/modules/public/views/ProductoView.vue')
        },
        {
          path: '/carrito',
          name: 'Carrito',
          component: () => import('@/modules/public/views/CarritoView.vue')
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/modules/public/views/LoginView.vue'),
          beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (token) {
              next({ name: 'Dashboard' });
            } else {
              next();
            }
          }
        },
      ]
    },
    {
      path:'/admin',
      component: () => import('@/modules/admin/views/AdminLayoutView.vue'),
      //controlar sesion
      meta: { requireAuth: true },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        if (token) {
          next();
        } else {
          next({ name: 'Login' });
        }
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/modules/admin/views/DashboardView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path: 'productos',
          name: 'Productos',
          component: () => import('@/modules/admin/views/ProductoCrudView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path: 'productos/crear',
          name: 'CrearProducto',
          component: () => import('@/modules/admin/views/ProductoFormView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path: 'productos/editar/:id',
          name: 'EditarProducto',
          component: () => import('@/modules/admin/views/ProductoFormView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path:'categorias',
          name: 'Categorias',
          component: () => import('@/modules/admin/views/CategoriaCrudView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path:'categorias/crear',
          name: 'CrearCategoria',
          component: () => import('@/modules/admin/views/CategoriaFromView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path:'categorias/editar/:id',
          name: 'EditarCategoria',
          component: () => import('@/modules/admin/views/CategoriaFromView.vue'),
          meta:{roles: ['admin', 'user']}

        },
        {
          path:'usuarios',
          name: 'Usuarios',
          component: () => import('@/modules/admin/views/UsuarioCrudView.vue'),
          meta:{roles: ['admin']}
        }

      ]
    }

  ],
})


router.beforeEach((to, from, next) => {

  const role = 'user'
  if (to.meta.roles) {
    if (hasRole(role)) {
      next();
    } else {
      next({ name: 'Inicio' });
    }
  } else {
    next();
  }

});

export default router
