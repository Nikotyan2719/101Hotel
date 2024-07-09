<template>
    <div class="pagination">
        <button
            :disabled="currentPage === 1"
            @click="prevPage"
        >
            <
        </button>
        <div
            v-for="page in pages"
            :class="{'active': currentPage === page}"
            class="pagination__elem"
            @click="changeCurrent(page)">
            {{ page }}
        </div>
        <button
            :disabled="currentPage === totalPages"
            @click="nextPage"
        >
            >
        </button>
    </div>
</template>
<script>

export default {
    props: {
        pages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true
        },
        changeCurrentPage:{
            type: Function,
            required: true
        }
    },
    computed: {
        totalPages() { return this.pages;}
    },
    methods: {
        changeCurrent(page) {
            if (page > this.totalPages) {
                this.changeCurrentPage(this.totalPages);
            } else {
                this.changeCurrentPage(page);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.changeCurrentPage(this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.changeCurrentPage(this.currentPage + 1);
            }
        }
    }
}
</script>
<style>

.pagination {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
}

.pagination__elem {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4CAF50;
    color: #fff;
    cursor: pointer;
    padding: 10px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.pagination__elem:hover {
    background-color: #388E3C;
}

.pagination__elem.active {
    font-size: 18px;
    font-weight: bold;
    background-color: #2E7D32;
    cursor: default;
}

.pagination button {
    background-color: #4CAF50;
    border: none;
    color: #fff;
    padding: 10px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.pagination button:hover:not([disabled]) {
    background-color: #388E3C;
}

.pagination button:disabled {
    background-color: #9E9E9E;
    cursor: not-allowed;
}


</style>
