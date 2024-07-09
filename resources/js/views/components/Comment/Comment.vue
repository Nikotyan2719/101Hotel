<template>
    <li class="comment">
        <div class="comment__inner">
            <div class="comment__id">
                <span class="comment__label">{{id}}</span>
            </div>
            <div class="comment__content">
                <div class="comment__header">
                    <div class="comment__author">
                        <span class="comment__label">Пользователь:</span>
                        {{ comment.name }}
                    </div>
                    <div class="comment__buttons">
                        <button v-if="!changing" class="comment__edit" @click="editCommentMode">Изменить</button>
                        <button v-else class="comment__submit" :disabled="isSubmitBtnDisabled" @click="btnEditComment(id)">Подтвердить</button>
                        <button class="comment__delete" :disabled="isDeleteBtnDisabled" @click="btnDeleteComment(id)">Удалить</button>
                    </div>
                </div>
                <div class="comment__message-wrapper">
                    <div v-if="!changing" class="comment__message">{{ comment.text }}</div>
                    <textarea
                        v-else
                        v-model="comment.text"
                        class="comment__textarea"
                        required
                        placeholder="Your comment"
                    />
                </div>
                <div class="comment__date">
                    {{ formatDate }}
                </div>
            </div>
        </div>
    </li>
</template>



<script>


export default {
    props: {
        name: {
            type: String,
        },
        text: {
            type: String,
        },
        date: {
            type: String,
        },
        id: {
            type: Number,
        },
        deleteComment: {
            type: Function,
            required: true,
        },
        editComment: {
            type: Function,
            required: true,
        },
    },
    computed: {
        formatDate() {
            const date = new Date(this.comment.date);
            return date.toLocaleString();
        },
        comment() {
            return { name: this.name, text: this.text, date: this.date };
        }
    },
    data() {
        return {
            isDeleteBtnDisabled: false,
            isSubmitBtnDisabled: false,
            changing: false,
        }
    },
    methods: {

        btnDeleteComment(id) {
            this.isDeleteBtnDisabled = true;
            this.deleteComment(id)
                .catch(() => {
                    this.isDeleteBtnDisabled = false;
                });
        },
        btnEditComment(id) {
            this.isSubmitBtnDisabled = true;
            const data = { id, comment: this.comment };
            this.editComment(data)
                .then(() => {
                    this.isSubmitBtnDisabled = false;
                    this.changing = false;
                });
        },
        editCommentMode() {
            this.changing = true;
        }
    }
}

</script>
<style>
.comment {
    list-style-type: none;
    border: 1px solid #d1e7dd;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.comment__inner {
    display: flex;
    gap: 16px;
    padding: 16px;
}

.comment__content {
    flex-basis: 100%;
}

.comment__label {
    font-size: 14px;
    color: #6c757d;
    font-weight: normal;
}

.comment__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #d1e7dd;
    padding-bottom: 8px;
}

.comment__author {
    font-weight: bold;
    color: #343a40;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #f3f9f7;
}

.comment__date {
    font-size: 14px;
    color: #6c757d;
}

.comment__message-wrapper {
    margin-bottom: 12px;
    padding-right: 60px;
}

.comment__message {
    font-size: 16px;
    color: #495057;
}

.comment__buttons {
    display: flex;
    gap: 12px;
}

.comment__edit,
.comment__submit,
.comment__delete {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.comment__edit {
    background-color: #4CAF50;
    color: #fff;
}

.comment__edit:hover {
    background-color: #388E3C;
}

.comment__submit {
    background-color: #4CAF50;
    color: #fff;
}

.comment__submit:hover {
    background-color: #388E3C;
}

.comment__delete {
    background-color: #dc3545;
    color: #fff;
}

.comment__delete:hover {
    background-color: #c82333;
}

.comment__edit:disabled,
.comment__submit:disabled,
.comment__delete:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .comment__header {
        flex-direction: column;
        align-items: flex-start;
        font-size: 16px;
        gap: 5px;
    }


    .comment__author {
        font-size: 18px;
    }

    .comment__label {
        font-size: 14px;
    }

    .comment__date {
        font-size: 18px;
    }

    .comment__message-wrapper {
        padding-right: 0;
    }

    .comment__message {
        font-size: 18px;
    }
}

</style>
