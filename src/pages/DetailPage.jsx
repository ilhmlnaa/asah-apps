import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import CommentInput from "../components/CommentInput";
import CommentsList from "../components/CommentsList";
import { postedAt } from "../utils";
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from "../states/threadDetail/action";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { threadDetail = null, authUser = null } = useSelector(
    (states) => states
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400">
            Loading thread...
          </div>
        </div>
      </div>
    );
  }

  const isUpVoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownVoted =
    authUser && threadDetail.downVotesBy.includes(authUser.id);

  const onAddComment = (content) => {
    if (!authUser) {
      alert("Please login to comment");
      return;
    }

    dispatch(asyncCreateComment({ threadId: id, content })).catch(() => {
      // Error already handled in action
    });
  };

  const onUpVoteThread = () => {
    if (!authUser) {
      alert("Please login to vote");
      return;
    }
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail());
    } else {
      dispatch(asyncUpVoteThreadDetail());
    }
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      alert("Please login to vote");
      return;
    }
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail());
    } else {
      dispatch(asyncDownVoteThreadDetail());
    }
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncNeutralVoteComment(commentId));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to discussions</span>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={threadDetail.owner.avatar}
              alt={threadDetail.owner.name}
              className="w-12 h-12 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {threadDetail.owner.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {postedAt(threadDetail.createdAt)}
                </span>
              </div>

              {threadDetail.category && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                  #{threadDetail.category}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {threadDetail.title}
          </h1>

          <div
            className="prose prose-gray dark:prose-invert max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: threadDetail.body }}
          />

          <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onUpVoteThread}
              className={`flex items-center space-x-2 transition-colors ${
                isUpVoted
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              <ThumbsUp
                className="w-5 h-5"
                fill={isUpVoted ? "currentColor" : "none"}
              />
              <span className="text-sm font-medium">
                {threadDetail.upVotesBy.length}
              </span>
            </button>

            <button
              type="button"
              onClick={onDownVoteThread}
              className={`flex items-center space-x-2 transition-colors ${
                isDownVoted
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              }`}
            >
              <ThumbsDown
                className="w-5 h-5"
                fill={isDownVoted ? "currentColor" : "none"}
              />
              <span className="text-sm font-medium">
                {threadDetail.downVotesBy.length}
              </span>
            </button>

            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {threadDetail.comments.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Comments ({threadDetail.comments.length})
          </h2>

          {authUser && <CommentInput addComment={onAddComment} />}

          <CommentsList
            comments={threadDetail.comments}
            authUser={authUser}
            upVote={onUpVoteComment}
            downVote={onDownVoteComment}
            neutralVote={onNeutralVoteComment}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
