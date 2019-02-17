<template>
    <commet :commetId="id"></commet>
</template>
<script>
export default {
    data(){
      return{
          id:this.$route.params.id
      }  
    },
    methods:{

    }
}
</script>
