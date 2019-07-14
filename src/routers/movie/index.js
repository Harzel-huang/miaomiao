export default {
    path:'/movie',
    component : () =>  import('@/views/Movie'),
    children:[
        {
            path:'city',
            component:()=>import('@/components/City')
        },
        {
            path:'comingSoon',
            component:()=>import('@/components/ComingSoon')
        },
        {
            path:'nowPlaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path:'search',
            component:()=>import('@/components/Search')
        },
        {
            path: 'detail/:movieId',
            components: {
                detail: () => import('@/views/movie/detail.vue'),
            },
            props: {
                detail: true
            }
        },
        {
            path:'/movie',
            redirect:'/movie/nowPlaying'
        }
    ]
    

}