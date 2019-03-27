import Api from '@/services/Api'

export default {
    fetchWorld() {
        return Api().get('world');
    }
}