function stringToBool(value: string) {
    switch (value.toLowerCase()) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return false;
    }
}

export default stringToBool;
