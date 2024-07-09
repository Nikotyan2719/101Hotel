import axios from "axios";

export default {
    actions: {
        fetchComments(ctx) {
            axios.get('/api/comments/')
                .then(response => {
                    ctx.commit('updateAllComments', response.data);
                    ctx.commit('sortComments');
                }).catch(error => {
                    console.error('Ошибка при получении комментариев:', error);
                })
        },
        changeCurrentPage(ctx, page) {
            ctx.commit('changeCurrentPage', page);
        },
        submitComment(ctx, newComment) {
            axios.post('/api/comments/', JSON.stringify(newComment),
                {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(() => {
                    return ctx.dispatch('fetchComments');
                })
                .catch(error => {
                    console.error('Ошибка при отправке комментария:', error);
                })
        },
        async deleteComment(ctx, id) {
            await axios.delete(`/api/comments/${id}`)
                .then(() => {
                    ctx.dispatch('fetchComments');
                })
                .catch(error => {
                    console.error('Ошибка при удалении комментария:', error);
                    throw new Error();
                })
        },
        async editComment(ctx, data) {
            await axios.patch(`/api/comments/${data.id}`, JSON.stringify(data.comment),
                {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(() => {
                    ctx.dispatch('fetchComments');
                })
                .catch(error => {
                    console.error('Ошибка при редактировании комментария:', error);
                })
        },

        sortComments({ commit }, sortData) {
            commit('sortComments', sortData);
        }

    },
    mutations: {
        updateAllComments(state, allComments) {
            state.allComments = allComments;
        },
        changeCurrentPage(state, page) {
            state.currentPage = page;
        },
        sortComments(state, { criterion, direction }) {
            state.allComments.sort((a, b) => {
                if (a[criterion] < b[criterion]) return direction === 'asc' ? -1 : 1;
                if (a[criterion] > b[criterion]) return direction === 'asc' ? 1 : -1;
                return 0;
            });
            state.sortedBy = { criterion, direction };
        }

    },
    state: {
        allComments: [],
        currentPage: 1,
        sortedBy: {
            criterion: 'id',
            direction: 'asc'
        }
    },

    getters: {
        allComments(state) {
            return state.allComments;
        },
        currentPage(state) {
            return state.currentPage;
        },
        sortedBy(state) {
            return state.sortedBy;
        }
    },
}
