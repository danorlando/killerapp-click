export type TSongSuggestionsRequest = {
  titles: string;
  length: number;
  temperature: number;
};

export type TSongSuggestionsResult = {
  suggestions: string;
};

export type TSong = {
  title: string;
  artist: string;
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export type TUsersList = {
  users: TUser[];
}

export type TApiResponse = {
  success: boolean;
  message: string;
  operationType: TOperationType;
};

export type TOperationType = 'Updated' | 'Created' | 'Deleted';

export type TChat = {
  prompt: string;
  model?: string;
};

export type TChatResponse = {
  response: string;
};

export type TOpenAIModels = {
  models: {
    object: string;
    data: TOpenAIModel[];
  }
};

export type TOpenAIModel = {
  object: string;
  id: string;
  ready: boolean;
  owner: string;
  created: string | null;
  permissions: string[] | null;
};
