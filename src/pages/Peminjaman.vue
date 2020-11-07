<template>
    <div>
        <div class="md-layout">
            <!-- <div class="breadcrumb">Peminjaman</div> -->
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="blue">
                        <div class="md-title">Daftar Ruangan</div>
                    </md-card-header>
                    <md-card-content>
                        <md-table>
                            <md-table-row>
                                <md-table-head>Nama Ruangan</md-table-head>
                                <md-table-head>Peminjaman</md-table-head>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>A3-01</md-table-cell>
                                <md-table-cell><router-link to="peminjaman/a301">Lihat Daftar</router-link></md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>A3-02</md-table-cell>
                                <md-table-cell><router-link to="peminjaman/a302">Lihat Daftar</router-link></md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>B1-01</md-table-cell>
                                <md-table-cell><a>Lihat Daftar</a></md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>B1-02</md-table-cell>
                                <md-table-cell><a>Lihat Daftar</a></md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>B2-01</md-table-cell>
                                <md-table-cell><a>Lihat Daftar</a></md-table-cell>
                            </md-table-row>
                            <md-table-row>
                                <md-table-cell>B2-02</md-table-cell>
                                <md-table-cell><a>Lihat Daftar</a></md-table-cell>
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
    name:"Peminjaman"
}
</script>

<style>
    .breadcrumb{
        margin-bottom:15px;
        font-size:16px;
    }
    .breadcrumb .router-link-active{
        background:none;
        box-shadow:none
    }
</style>