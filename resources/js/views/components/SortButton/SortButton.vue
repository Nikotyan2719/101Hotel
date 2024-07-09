<template>
    <button class="sort-button" :class="{ 'sort-button--inactive': isCriterionActive }" @click="handleSortClick">
        {{ text }}
        <span v-if="direction === 'asc'">&#x2193;</span>
        <span v-else>&#x2191;</span>
    </button>
</template>

<script>

export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        criterion: {
            type: String,
            required: true
        },
        direction: {
            type: String,
            required: true,
        },
        sortedBy: {
            type: Object,
            required: true,
        },
        onSort: {
            type: Function,
            required: true,
        },
    },
    computed: {
        isCriterionActive() {
            return this.sortedBy.criterion !== this.criterion;
        },
    },
    methods: {
        handleSortClick() {
            this.onSort({
                criterion: this.criterion,
                direction: this.direction === 'asc' ? 'desc' : 'asc',
            });
        },
    },
};
</script>


<style>

.sort-button {
    background-color: #4CAF50;
    border: none;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 25px;
    transition: background-color 0.3s ease;
}

.sort-button:hover {
    background-color: #388E3C;
}

.sort-button--inactive {
    background-color: #e6e6e6;
    color: #999;
}

@media (max-width: 768px) {
    .sort-button {
        font-size: 14px;
        padding: 5px;
    }
}
</style>
