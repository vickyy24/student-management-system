import axios from "axios";
import { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";

const Videotut=()=>{
    
    const [modules, setModules] = useState([]);
    const [topics, setTopics] = useState([]);
    const [video, setVideo] = useState(null);

    // MODULES
    useEffect(() => {
        axios({
            url: "http://localhost:9000/api/modules",
            method: "GET",
            withCredentials: true
        })
        .then((res) => {
            setModules(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // load first module topics (not video)
    useEffect(function () {
        if (modules.length > 0) {
            loadTopics(modules[0].module_id);
        }
    }, [modules]);

    // topics api
    // load topics not videos in player
    function loadTopics(moduleId) {
        axios({
            url: "http://localhost:9000/api/topics/" + moduleId,
            method: "GET",
            withCredentials: true
        })
        .then(function (res) {
            setTopics(res.data);
            setVideo(null); // keep video empty
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    // VIDEOS
    //load video only on topic click
    function loadVideo(topicId) {
        axios({
            url: "http://localhost:9000/api/videos/" + topicId,
            method: "GET",
            withCredentials: true
        })
        .then(function (res) {
            if (res.data.length > 0) {
                setVideo(res.data[0]);
            }
            
        })
        .catch(function (err) {
            console.log(err);
        });
    }
     function handleModuleClick(e) {
        const moduleId = e.currentTarget.value;
        loadTopics(moduleId);
    }

    function handleTopicClick(e) {
        const topicId = e.currentTarget.value;
        loadVideo(topicId);
    }

    return(
        <div>
            <Row className="mt-3">

                {/* left side MOdulelist */}
                <Col md={2} >
                    <ListGroup>
                        {modules.map( (m)=>(
                            <ListGroupItem key={m.module_id} action value={m.module_id} onClick={handleModuleClick}>
                                {m.module_name}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>

                {/* Center video player */}
                <Col md={7}>
                
                    <h5 className="mb-3">{video ? video.video_title : ""}</h5>
                    
                    <iframe width="100%" height="450"src={video ? video.video_url : "about:blank"} title="video" className="border border-2 border-primary rounded bg-secondary"></iframe>
                </Col>

                {/* Rigth side Topiclist */}
                <Col md={3}>
                    <ListGroup>
                        {topics.map( (t)=> (
                            <ListGroupItem key={t.topic_id} action value={t.topic_id} onClick={handleTopicClick}>
                                {t.topic_name}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>

            </Row>
        </div>
    )
}
export default Videotut;