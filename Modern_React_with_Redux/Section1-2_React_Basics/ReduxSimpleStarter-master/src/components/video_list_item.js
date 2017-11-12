import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
    // const video = props.video;
    // const onVideoSelect = props.onVideoSelect;
    const imageUrl = video.snippet.thumbnails.default.url;

    return (
        <li onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left col-md-5">
                    <img className="media-object" src={imageUrl} />
                </div>

                <div className="media-object col-md-7">
                    <div className="media-heading">
                        {video.snippet.title}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;