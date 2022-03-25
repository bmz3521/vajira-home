import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const sameReply = currentReply => reply => currentReply.value === reply.value;
const diffReply = currentReply => reply => currentReply.value !== reply.value;

function CustomQuickReplies({ data }) {
  const [replies, setReplies] = useState([]);

  const handlePress = reply => () => {
    const { currentMessage } = data;
    if (currentMessage) {
      const { type } = currentMessage.quickReplies;
      switch (type) {
        case 'radio': {
          handleSend([reply])();
          return;
        }
        case 'checkbox': {
          if (replies.find(sameReply(reply))) {
            setReplies(replies.filter(diffReply(reply)));
          } else {
            setReplies([...replies, reply]);
          }
          return;
        }
        default: {
          console.log(
            '%c[react-native-gifted-chat]',
            `color: orange; font-weight: bold`,
            `onQuickReply unknown type: ${type}`,
          );
          return;
        }
      }
    }
  };

  const shouldComponentDisplay = () => {
    const { currentMessage, nextMessage } = data;
    const hasReplies = !!currentMessage && !!currentMessage.quickReplies;
    const hasNext = !!nextMessage && !!nextMessage._id;
    const keepIt = currentMessage.quickReplies.keepIt;
    if (hasReplies && !hasNext) {
      return true;
    }
    if (hasReplies && hasNext && keepIt) {
      return true;
    }
    return false;
  };

  if (!shouldComponentDisplay()) {
    return null;
  }

  const handleSend = replies => () => {
    const { currentMessage } = data;
    if (data.onQuickReply) {
      data.onQuickReply(
        replies.map(reply => ({
          ...reply,
          messageId: currentMessage._id,
        })),
      );
    }
  };

  const renderQuickReplySend = () => {
    const { renderQuickReplySend: customSend } = data;

    return (
      <TouchableOpacity
        style={[styles.quickReply, styles.sendLink]}
        onPress={handleSend(replies)}
      >
        {customSend ? (
          customSend()
        ) : (
          <Text style={styles.sendLinkText}>Send</Text>
        )}
      </TouchableOpacity>
    );
  };

  const { type } = data.currentMessage.quickReplies;

  return (
    <View>
      {data.currentMessage.quickReplies.values.map((reply, index) => {
        const selected = type === 'checkbox' && replies.find(sameReply(reply));

        return (
          <TouchableOpacity
            disabled={reply.disable ? reply.disable : false}
            onPress={handlePress(reply)}
            style={[
              styles.quickReply,
              { borderColor: reply.bColor },
              { width: 230 },
              { backgroundColor: reply.bgColor },
            ]}
            key={`${reply.value}-${index}`}
          >
            <Text
              numberOfLines={10}
              ellipsizeMode={'tail'}
              style={[
                styles.quickReplyText,
                reply.txtStyle,
                { color: reply.fColor || '#fff', fontSize: 16 },
              ]}
            >
              {reply.title}
            </Text>
          </TouchableOpacity>
        );
      })}
      {replies.length > 0 && renderQuickReplySend()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 240,
    marginBottom: 20,
  },
  quickReply: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: 260,
    paddingVertical: 7,
    paddingHorizontal: 12,
    minHeight: 40,
    borderRadius: 13,
    margin: 3,
  },
  quickReplyText: {
    overflow: 'visible',
  },
  sendLink: {
    borderWidth: 0,
  },
  sendLinkText: {
    color: 'dodgerblue',
    fontWeight: '600',
    fontSize: 17,
  },
});

export default CustomQuickReplies;
