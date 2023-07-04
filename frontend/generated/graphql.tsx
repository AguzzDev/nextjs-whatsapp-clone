import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  participants?: Maybe<Array<Participant>>;
  updatedAt: Scalars['DateTime'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  chatId: Scalars['String'];
  id: Scalars['ID'];
  message: Scalars['String'];
  timestamp: Scalars['DateTime'];
  type: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAdmin: Scalars['Boolean'];
  addParticipant: Scalars['Boolean'];
  changeBackground: Scalars['Boolean'];
  changeOptionsChat: Scalars['Boolean'];
  changeProfile: Scalars['Boolean'];
  createChat: Chat;
  login: UserResponse;
  register: UserResponse;
  removeAdmin: Scalars['Boolean'];
  removeChat: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  userLeaveChat: Scalars['Boolean'];
};


export type MutationAddAdminArgs = {
  userId: Scalars['String'];
};


export type MutationAddParticipantArgs = {
  participants: Array<ParticipantInput>;
};


export type MutationChangeBackgroundArgs = {
  image: Scalars['String'];
};


export type MutationChangeOptionsChatArgs = {
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};


export type MutationChangeProfileArgs = {
  bio?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateChatArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  participants: Array<ParticipantInput>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveAdminArgs = {
  userId: Scalars['String'];
};


export type MutationRemoveChatArgs = {
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['String'];
  message: Scalars['String'];
  type: Scalars['String'];
};


export type MutationUserLeaveChatArgs = {
  chatId: Scalars['String'];
  userId: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  chat: Chat;
  chatId: Scalars['String'];
  role: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type ParticipantInput = {
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allChats?: Maybe<Array<Chat>>;
  allUsers: Array<User>;
  filterMessages: Array<Message>;
  findParticipants: Array<Participant>;
  joinChat: Chat;
  me: User;
  messages: Array<Message>;
};


export type QueryFilterMessagesArgs = {
  id: Scalars['String'];
  message: Scalars['String'];
};


export type QueryFindParticipantsArgs = {
  id: Scalars['String'];
};


export type QueryJoinChatArgs = {
  id: Scalars['String'];
};


export type QueryMessagesArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessages: Message;
  updateChats: UpdateChatInput;
  updateParticipants: Participant;
};

export type User = {
  __typename?: 'User';
  backgroundImage?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  chats?: Maybe<Array<Chat>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UpdateChatInput = {
  __typename?: 'updateChatInput';
  id: Scalars['String'];
  type: Scalars['String'];
};

export type AddParticipantMutationVariables = Exact<{
  participants: Array<ParticipantInput> | ParticipantInput;
}>;


export type AddParticipantMutation = { __typename?: 'Mutation', addParticipant: boolean };

export type ChangeBackgroundMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type ChangeBackgroundMutation = { __typename?: 'Mutation', changeBackground: boolean };

export type ChangeProfileMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
}>;


export type ChangeProfileMutation = { __typename?: 'Mutation', changeProfile: boolean };

export type CreateChatMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  participants: Array<ParticipantInput> | ParticipantInput;
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name: string, description: string, image: string, createdAt: any, participants?: Array<{ __typename?: 'Participant', role: string, user: { __typename?: 'User', id: string, name: string, image?: string | null, bio?: string | null } }> | null, messages?: Array<{ __typename?: 'Message', id: string, type: string, message: string, timestamp: any, user: { __typename?: 'User', id: string, name: string, image?: string | null } }> | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null } };

export type RemoveChatMutationVariables = Exact<{
  removeChatId: Scalars['String'];
}>;


export type RemoveChatMutation = { __typename?: 'Mutation', removeChat: boolean };

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  type: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UserLeaveChatMutationVariables = Exact<{
  userId: Scalars['String'];
  chatId: Scalars['String'];
}>;


export type UserLeaveChatMutation = { __typename?: 'Mutation', userLeaveChat: boolean };

export type AllChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChatsQuery = { __typename?: 'Query', allChats?: Array<{ __typename?: 'Chat', id: string, name: string, image: string, messages?: Array<{ __typename?: 'Message', id: string, type: string, message: string, timestamp: any, user: { __typename?: 'User', id: string, name: string } }> | null }> | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: string, name: string, image?: string | null }> };

export type FindParticipantsQueryVariables = Exact<{
  findParticipantsId: Scalars['String'];
}>;


export type FindParticipantsQuery = { __typename?: 'Query', findParticipants: Array<{ __typename?: 'Participant', role: string, user: { __typename?: 'User', id: string, image?: string | null, name: string, bio?: string | null } }> };

export type JoinChatQueryVariables = Exact<{
  joinChatId: Scalars['String'];
}>;


export type JoinChatQuery = { __typename?: 'Query', joinChat: { __typename?: 'Chat', id: string, name: string, description: string, image: string, createdAt: any, owner: { __typename?: 'User', id: string, name: string }, participants?: Array<{ __typename?: 'Participant', role: string, user: { __typename?: 'User', id: string, name: string, image?: string | null, bio?: string | null } }> | null, messages?: Array<{ __typename?: 'Message', id: string, type: string, message: string, timestamp: any, user: { __typename?: 'User', id: string, name: string, image?: string | null } }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, image?: string | null, backgroundImage?: string | null, bio?: string | null, createdAt: any } };

export type MessagesQueryVariables = Exact<{
  messagesId: Scalars['String'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, message: string, timestamp: any, type: string, user: { __typename?: 'User', id: string, name: string, image?: string | null } }> };

export type NewMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessagesSubscription = { __typename?: 'Subscription', newMessages: { __typename?: 'Message', id: string, message: string, timestamp: any, type: string, user: { __typename?: 'User', id: string, name: string, image?: string | null } } };

export type UpdateChatsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateChatsSubscription = { __typename?: 'Subscription', updateChats: { __typename?: 'updateChatInput', type: string, id: string } };

export type UpdateParticipantsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateParticipantsSubscription = { __typename?: 'Subscription', updateParticipants: { __typename?: 'Participant', user: { __typename?: 'User', id: string, image?: string | null, name: string } } };


export const AddParticipantDocument = gql`
    mutation AddParticipant($participants: [ParticipantInput!]!) {
  addParticipant(participants: $participants)
}
    `;
export type AddParticipantMutationFn = Apollo.MutationFunction<AddParticipantMutation, AddParticipantMutationVariables>;

/**
 * __useAddParticipantMutation__
 *
 * To run a mutation, you first call `useAddParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addParticipantMutation, { data, loading, error }] = useAddParticipantMutation({
 *   variables: {
 *      participants: // value for 'participants'
 *   },
 * });
 */
export function useAddParticipantMutation(baseOptions?: Apollo.MutationHookOptions<AddParticipantMutation, AddParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddParticipantMutation, AddParticipantMutationVariables>(AddParticipantDocument, options);
      }
export type AddParticipantMutationHookResult = ReturnType<typeof useAddParticipantMutation>;
export type AddParticipantMutationResult = Apollo.MutationResult<AddParticipantMutation>;
export type AddParticipantMutationOptions = Apollo.BaseMutationOptions<AddParticipantMutation, AddParticipantMutationVariables>;
export const ChangeBackgroundDocument = gql`
    mutation changeBackground($image: String!) {
  changeBackground(image: $image)
}
    `;
export type ChangeBackgroundMutationFn = Apollo.MutationFunction<ChangeBackgroundMutation, ChangeBackgroundMutationVariables>;

/**
 * __useChangeBackgroundMutation__
 *
 * To run a mutation, you first call `useChangeBackgroundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBackgroundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBackgroundMutation, { data, loading, error }] = useChangeBackgroundMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useChangeBackgroundMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBackgroundMutation, ChangeBackgroundMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBackgroundMutation, ChangeBackgroundMutationVariables>(ChangeBackgroundDocument, options);
      }
export type ChangeBackgroundMutationHookResult = ReturnType<typeof useChangeBackgroundMutation>;
export type ChangeBackgroundMutationResult = Apollo.MutationResult<ChangeBackgroundMutation>;
export type ChangeBackgroundMutationOptions = Apollo.BaseMutationOptions<ChangeBackgroundMutation, ChangeBackgroundMutationVariables>;
export const ChangeProfileDocument = gql`
    mutation ChangeProfile($name: String, $image: String, $bio: String) {
  changeProfile(name: $name, image: $image, bio: $bio)
}
    `;
export type ChangeProfileMutationFn = Apollo.MutationFunction<ChangeProfileMutation, ChangeProfileMutationVariables>;

/**
 * __useChangeProfileMutation__
 *
 * To run a mutation, you first call `useChangeProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileMutation, { data, loading, error }] = useChangeProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useChangeProfileMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileMutation, ChangeProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileMutation, ChangeProfileMutationVariables>(ChangeProfileDocument, options);
      }
export type ChangeProfileMutationHookResult = ReturnType<typeof useChangeProfileMutation>;
export type ChangeProfileMutationResult = Apollo.MutationResult<ChangeProfileMutation>;
export type ChangeProfileMutationOptions = Apollo.BaseMutationOptions<ChangeProfileMutation, ChangeProfileMutationVariables>;
export const CreateChatDocument = gql`
    mutation CreateChat($name: String!, $image: String!, $participants: [ParticipantInput!]!, $description: String) {
  createChat(
    name: $name
    image: $image
    participants: $participants
    description: $description
  ) {
    id
    name
    description
    image
    participants {
      user {
        id
        name
        image
        bio
      }
      role
    }
    messages {
      id
      type
      message
      user {
        id
        name
        image
      }
      timestamp
    }
    createdAt
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      participants: // value for 'participants'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      message
      field
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    errors {
      message
      field
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveChatDocument = gql`
    mutation RemoveChat($removeChatId: String!) {
  removeChat(id: $removeChatId)
}
    `;
export type RemoveChatMutationFn = Apollo.MutationFunction<RemoveChatMutation, RemoveChatMutationVariables>;

/**
 * __useRemoveChatMutation__
 *
 * To run a mutation, you first call `useRemoveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChatMutation, { data, loading, error }] = useRemoveChatMutation({
 *   variables: {
 *      removeChatId: // value for 'removeChatId'
 *   },
 * });
 */
export function useRemoveChatMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChatMutation, RemoveChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveChatMutation, RemoveChatMutationVariables>(RemoveChatDocument, options);
      }
export type RemoveChatMutationHookResult = ReturnType<typeof useRemoveChatMutation>;
export type RemoveChatMutationResult = Apollo.MutationResult<RemoveChatMutation>;
export type RemoveChatMutationOptions = Apollo.BaseMutationOptions<RemoveChatMutation, RemoveChatMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($chatId: String!, $type: String!, $message: String!) {
  sendMessage(chatId: $chatId, type: $type, message: $message)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      type: // value for 'type'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const UserLeaveChatDocument = gql`
    mutation UserLeaveChat($userId: String!, $chatId: String!) {
  userLeaveChat(userId: $userId, chatId: $chatId)
}
    `;
export type UserLeaveChatMutationFn = Apollo.MutationFunction<UserLeaveChatMutation, UserLeaveChatMutationVariables>;

/**
 * __useUserLeaveChatMutation__
 *
 * To run a mutation, you first call `useUserLeaveChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLeaveChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLeaveChatMutation, { data, loading, error }] = useUserLeaveChatMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useUserLeaveChatMutation(baseOptions?: Apollo.MutationHookOptions<UserLeaveChatMutation, UserLeaveChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLeaveChatMutation, UserLeaveChatMutationVariables>(UserLeaveChatDocument, options);
      }
export type UserLeaveChatMutationHookResult = ReturnType<typeof useUserLeaveChatMutation>;
export type UserLeaveChatMutationResult = Apollo.MutationResult<UserLeaveChatMutation>;
export type UserLeaveChatMutationOptions = Apollo.BaseMutationOptions<UserLeaveChatMutation, UserLeaveChatMutationVariables>;
export const AllChatsDocument = gql`
    query AllChats {
  allChats {
    id
    name
    image
    messages {
      id
      type
      message
      user {
        id
        name
      }
      timestamp
    }
  }
}
    `;

/**
 * __useAllChatsQuery__
 *
 * To run a query within a React component, call `useAllChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllChatsQuery(baseOptions?: Apollo.QueryHookOptions<AllChatsQuery, AllChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllChatsQuery, AllChatsQueryVariables>(AllChatsDocument, options);
      }
export function useAllChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllChatsQuery, AllChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllChatsQuery, AllChatsQueryVariables>(AllChatsDocument, options);
        }
export type AllChatsQueryHookResult = ReturnType<typeof useAllChatsQuery>;
export type AllChatsLazyQueryHookResult = ReturnType<typeof useAllChatsLazyQuery>;
export type AllChatsQueryResult = Apollo.QueryResult<AllChatsQuery, AllChatsQueryVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    id
    name
    image
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const FindParticipantsDocument = gql`
    query FindParticipants($findParticipantsId: String!) {
  findParticipants(id: $findParticipantsId) {
    user {
      id
      image
      name
      bio
    }
    role
  }
}
    `;

/**
 * __useFindParticipantsQuery__
 *
 * To run a query within a React component, call `useFindParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindParticipantsQuery({
 *   variables: {
 *      findParticipantsId: // value for 'findParticipantsId'
 *   },
 * });
 */
export function useFindParticipantsQuery(baseOptions: Apollo.QueryHookOptions<FindParticipantsQuery, FindParticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindParticipantsQuery, FindParticipantsQueryVariables>(FindParticipantsDocument, options);
      }
export function useFindParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindParticipantsQuery, FindParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindParticipantsQuery, FindParticipantsQueryVariables>(FindParticipantsDocument, options);
        }
export type FindParticipantsQueryHookResult = ReturnType<typeof useFindParticipantsQuery>;
export type FindParticipantsLazyQueryHookResult = ReturnType<typeof useFindParticipantsLazyQuery>;
export type FindParticipantsQueryResult = Apollo.QueryResult<FindParticipantsQuery, FindParticipantsQueryVariables>;
export const JoinChatDocument = gql`
    query JoinChat($joinChatId: String!) {
  joinChat(id: $joinChatId) {
    id
    name
    description
    image
    owner {
      id
      name
    }
    participants {
      user {
        id
        name
        image
        bio
      }
      role
    }
    messages {
      id
      type
      message
      user {
        id
        name
        image
      }
      timestamp
    }
    createdAt
  }
}
    `;

/**
 * __useJoinChatQuery__
 *
 * To run a query within a React component, call `useJoinChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinChatQuery({
 *   variables: {
 *      joinChatId: // value for 'joinChatId'
 *   },
 * });
 */
export function useJoinChatQuery(baseOptions: Apollo.QueryHookOptions<JoinChatQuery, JoinChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JoinChatQuery, JoinChatQueryVariables>(JoinChatDocument, options);
      }
export function useJoinChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JoinChatQuery, JoinChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JoinChatQuery, JoinChatQueryVariables>(JoinChatDocument, options);
        }
export type JoinChatQueryHookResult = ReturnType<typeof useJoinChatQuery>;
export type JoinChatLazyQueryHookResult = ReturnType<typeof useJoinChatLazyQuery>;
export type JoinChatQueryResult = Apollo.QueryResult<JoinChatQuery, JoinChatQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    image
    backgroundImage
    bio
    createdAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query messages($messagesId: String!) {
  messages(id: $messagesId) {
    id
    message
    timestamp
    type
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      messagesId: // value for 'messagesId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const NewMessagesDocument = gql`
    subscription newMessages {
  newMessages {
    id
    message
    timestamp
    type
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useNewMessagesSubscription__
 *
 * To run a query within a React component, call `useNewMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessagesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessagesSubscription, NewMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewMessagesSubscription, NewMessagesSubscriptionVariables>(NewMessagesDocument, options);
      }
export type NewMessagesSubscriptionHookResult = ReturnType<typeof useNewMessagesSubscription>;
export type NewMessagesSubscriptionResult = Apollo.SubscriptionResult<NewMessagesSubscription>;
export const UpdateChatsDocument = gql`
    subscription UpdateChats {
  updateChats {
    type
    id
  }
}
    `;

/**
 * __useUpdateChatsSubscription__
 *
 * To run a query within a React component, call `useUpdateChatsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateChatsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateChatsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateChatsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateChatsSubscription, UpdateChatsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateChatsSubscription, UpdateChatsSubscriptionVariables>(UpdateChatsDocument, options);
      }
export type UpdateChatsSubscriptionHookResult = ReturnType<typeof useUpdateChatsSubscription>;
export type UpdateChatsSubscriptionResult = Apollo.SubscriptionResult<UpdateChatsSubscription>;
export const UpdateParticipantsDocument = gql`
    subscription UpdateParticipants {
  updateParticipants {
    user {
      id
      image
      name
    }
  }
}
    `;

/**
 * __useUpdateParticipantsSubscription__
 *
 * To run a query within a React component, call `useUpdateParticipantsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateParticipantsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateParticipantsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateParticipantsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateParticipantsSubscription, UpdateParticipantsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateParticipantsSubscription, UpdateParticipantsSubscriptionVariables>(UpdateParticipantsDocument, options);
      }
export type UpdateParticipantsSubscriptionHookResult = ReturnType<typeof useUpdateParticipantsSubscription>;
export type UpdateParticipantsSubscriptionResult = Apollo.SubscriptionResult<UpdateParticipantsSubscription>;