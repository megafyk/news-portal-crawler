import Api from '@/services/Api'

export default {
    fetchNews() {
        return Api().get('news')
    }
}