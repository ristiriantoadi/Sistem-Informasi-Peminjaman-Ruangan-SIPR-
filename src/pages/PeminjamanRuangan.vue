<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <h3>{{ruanganUppercase}}</h3>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="blue">
            <div class="md-title">Peminjaman</div>
          </md-card-header>
          <md-card-content>
            <md-table>
              <md-table-row>
                <md-table-head>Nama Peminjam</md-table-head>
                <md-table-head>Tanggal</md-table-head>
                <md-table-head>Waktu</md-table-head>
                <md-table-head>Perihal</md-table-head>
                <!-- <md-table-head></md-table-head> -->
              </md-table-row>
              <md-table-row>
                <md-table-cell>Wawan Setiawan</md-table-cell>
                <md-table-cell>10 Oktober 2020</md-table-cell>
                <md-table-cell>08:00-13:00</md-table-cell>
                <md-table-cell>Kegiatan Lomba Membuat Poster HUT Momen</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell>Andika</md-table-cell>
                <md-table-cell>12 Oktober 2020</md-table-cell>
                <md-table-cell>15:00-18:00</md-table-cell>
                <md-table-cell>Rapat Umum Himpunan Informatika</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>      
</template>

<script>
export default {
  name:"PeminjamanRuangan",
  mounted(){
    console.log(this.$route.params)
  },
  computed:{
    ruanganUppercase(){
      return this.$route.params.ruangan.toUpperCase()
    }
  }
}
</script>

<style>

</style>