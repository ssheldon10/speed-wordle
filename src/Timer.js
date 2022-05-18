import useTimer from 'easytimer-react-hook';

function Timer(props) {
    /* The hook returns an EasyTimer instance and a flag to see if the target has been achieved */
    const [timer, isTargetAchieved] = useTimer({
        /* Hook configuration */
    });

    // timer.start({
    //     /* EasyTimer start configuration */
    // });

    return <div>{timer.getTimeValues().toString()}</div>;
}

export default Timer