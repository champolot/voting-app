const setInitialStore = () => {
    const storeName = 'thekholm80VotingApp';
    const payload = {
        "polls": []
    }

    localStorage.setItem(storeName, JSON.stringify(payload));
    return JSON.parse(localStorage.getItem(storeName));
}

export default setInitialStore;
