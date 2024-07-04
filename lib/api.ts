import { ID, Role, Permission, Query } from 'appwrite';
import { databases, storage, account } from './appwrite';

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;
const coursesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID!;
const documentsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENTS_COLLECTION_ID!;
const subscriptionsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_SUBSCRIPTIONS_COLLECTION_ID!;
const applicationsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_APPLICATIONS_COLLECTION_ID!;
const messagesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID!;
const userIconStorageId = process.env.NEXT_PUBLIC_APPWRITE_USERICON_ID!;

export interface UserProfile {
  $id: string;
  username: string;
  email: string;
  userId: string;
  memberType: string;
  education: string;
  school: string;
  iconUrl: string;
  iconId: string;
  documentId: string;
  phoneNumber: string;
  subscriptions: Subscription[];
  favorite_courses: Course[];
  favorite_documents: Document[];
}

export interface Subscription {
  $id: string;
  course: Course;
  user: string;
  startDate: string;
}

export interface Course {
  $id: string;
  courseCode: string;
  courseName: string;
  university: string;
  documents: Document[];
}

export interface Document {
  $id: string;
  documentType: string;
  uploadedBy: string;
  fileUrl: string;
  uploadTime: string;
  description: string;
}

export interface Application {
  name: string;
  email: string;
  phone: string;
  message: string;
  jobTitle: string;
}

export interface Message {
  name: string;
  email: string;
  type: string;
  message: string;
}

// Central felhanteringsfunktion
const handleError = (message: string, error: any) => {
  console.error(message, error);
  throw new Error(message);
};

export const getUserData = async (userId: string): Promise<UserProfile> => {
  try {
    const response = await databases.listDocuments(databaseId, usersCollectionId, [
      Query.equal('userId', userId)
    ]);

    if (response.total === 0) {
      throw new Error('User document not found');
    }

    const doc = response.documents[0];

    return {
      $id: doc.$id,
      username: doc.username,
      email: doc.email,
      userId: doc.userId,
      memberType: doc.memberType,
      education: doc.education,
      school: doc.school,
      iconUrl: doc.iconUrl,
      iconId: doc.iconId,
      documentId: doc.$id,
      phoneNumber: doc.phoneNumber || '',
      subscriptions: doc.subscriptions || [],
      favorite_courses: doc.favorite_courses || [],
      favorite_documents: doc.favorite_documents || [],
    };
  } catch (error: any) {
    handleError('Failed to fetch user data', error);
    throw new Error('Failed to fetch user data'); // Lägg till detta för att säkerställa att vi alltid kastar ett fel
  }
};


export const getCourseData = async (courseId: string): Promise<Course> => {
  try {
    const response = await databases.getDocument(databaseId, coursesCollectionId, courseId);

    if (!response) {
      throw new Error('Course not found');
    }

    return {
      $id: response.$id,
      courseCode: response.courseCode,
      courseName: response.courseName,
      university: response.university,
      documents: response.documents || [],
    };
  } catch (error: any) {
    handleError('Failed to fetch course data', error);
    throw new Error('Failed to fetch course data'); // Lägg till detta för att säkerställa att vi alltid kastar ett fel
  }
};


export const getCoursesData = async (): Promise<Course[]> => {
  try {
    const response = await databases.listDocuments(databaseId, coursesCollectionId);
    const courses = response.documents;

    return await Promise.all(
      courses.map(async (course: any) => await getCourseData(course.$id))
    );
  } catch (error: any) {
    handleError('Failed to fetch courses data', error);
    throw new Error('Failed to fetch courses data'); // Lägg till detta för att säkerställa att vi alltid kastar ett fel
  }
};


export const getCourseDocuments = async (courseId: string) => {
  try {
    const response = await databases.listDocuments(databaseId, documentsCollectionId, [
      Query.equal('courses', courseId)
    ]);

    if (response.total === 0) {
      throw new Error('No documents found for this course');
    }

    return response.documents;
  } catch (error: any) {
    handleError('Failed to fetch course documents', error);
  }
};

export const getCourseDataByCode = async (courseCode: string): Promise<Course> => {
  try {
    const response = await databases.listDocuments(databaseId, coursesCollectionId, [
      Query.equal('courseCode', courseCode)
    ]);

    if (response.total === 0) {
      throw new Error('Course not found');
    }

    const courseDoc = response.documents[0];
    const documentsResponse = await databases.listDocuments(databaseId, documentsCollectionId, [
      Query.equal('courses', courseDoc.$id)  // Assuming 'courses' is the field name linking documents to the course
    ]);

    const documents: Document[] = documentsResponse.documents
      .filter((doc: any) => doc && doc.$id)  // Filter out null or invalid documents
      .map((doc: any) => ({
        $id: doc.$id,
        documentType: doc.documentType,
        uploadedBy: doc.uploadedBy,
        fileUrl: doc.fileUrl,
        uploadTime: doc.uploadTime,
        description: doc.description
      }));

    return {
      $id: courseDoc.$id,
      courseCode: courseDoc.courseCode,
      courseName: courseDoc.courseName,
      university: courseDoc.university,
      documents: documents
    };
  } catch (error: any) {
    handleError('Failed to fetch course data by code', error);
    throw new Error('Failed to fetch course data by code');
  }
};




export const checkUserSubscription = async (userId: string, courseId: string): Promise<boolean> => {
  try {
    const user = await getUserData(userId);
    const response = await databases.listDocuments(databaseId, subscriptionsCollectionId, [
      Query.equal('user', user.$id),
      Query.equal('course', courseId) // Använd courseId istället för courseCode
    ]);
    return response.total > 0;
  } catch (error: any) {
    handleError('Failed to check subscription', error);
    throw new Error('Failed to check subscription'); // Lägg till detta för att säkerställa att vi alltid kastar ett fel
  }
};


// createSubscription
export const createSubscription = async (userId: string, courseId: string) => {
  try {
    const user = await getUserData(userId);
    const response = await databases.createDocument(
      databaseId,
      subscriptionsCollectionId,
      ID.unique(),
      {
        user: user.$id,
        course: courseId,
        startDate: new Date().toISOString()
      },
      [
        Permission.read(Role.any()),
        Permission.write(Role.any())
      ]
    );

    return response;
  } catch (error: any) {
    console.error('Failed to create subscription:', error.message);
    throw new Error('Failed to create subscription');
  }
};
// removeSubscription
export const removeSubscription = async (userId: string, courseId: string) => {
  try {
    const user = await getUserData(userId);
    const response = await databases.listDocuments(databaseId, subscriptionsCollectionId, [
      Query.equal('user', user.$id),
      Query.equal('course', courseId)
    ]);

    if (response.total === 0) {
      throw new Error('Subscription not found');
    }

    const subscriptionId = response.documents[0].$id;

    await databases.deleteDocument(databaseId, subscriptionsCollectionId, subscriptionId);

    return { message: 'Subscription removed successfully' };
  } catch (error: any) {
    console.error('Failed to remove subscription:', error.message);
    throw new Error('Failed to remove subscription');
  }
};

export const uploadUserProfilePicture = async (userId: string, file: File, oldIconId?: string) => {
  try {
    const response = await storage.createFile(
      userIconStorageId,
      ID.unique(),
      file,
      [
        Permission.read(Role.user(userId)),
        Permission.write(Role.user(userId))
      ]
    );

    const iconUrl = `https://cloud.appwrite.io/v1/storage/buckets/${userIconStorageId}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    const iconId = response.$id;

    if (oldIconId) {
      await storage.deleteFile(userIconStorageId, oldIconId);
    }

    return { iconUrl, iconId };
  } catch (error: any) {
    handleError('Failed to upload user profile picture', error);
  }
};

export const updateUserProfile = async (documentId: string, updatedData: Partial<UserProfile>, password: string) => {
  try {
    if (updatedData.phoneNumber) {
      await account.updatePhone(updatedData.phoneNumber, password);
    }

    if (updatedData.email) {
      await account.updateEmail(updatedData.email, password);
    }

    // Filter out empty fields
    const profileUpdateData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined && value !== '')
    );

    return await databases.updateDocument(
      databaseId,
      usersCollectionId,
      documentId,
      profileUpdateData
    );
  } catch (error: any) {
    handleError('Failed to update profile', error);
  }
};







export const updatePhoneNumber = async (userId: string, phoneNumber: string, documentId: string) => {
  try {
    await account.updatePrefs({ phone: phoneNumber });

    await databases.updateDocument(
      databaseId,
      usersCollectionId,
      documentId,
      { phoneNumber }
    );
  } catch (error: any) {
    handleError('Failed to update phone number', error);
  }
};

export const updateEmail = async (userId: string, email: string, password: string, documentId: string) => {
  try {
    await account.updateEmail(email, password);

    await databases.updateDocument(
      databaseId,
      usersCollectionId,
      documentId,
      { email }
    );
  } catch (error: any) {
    handleError('Failed to update email', error);
  }
};

export const getSubscriptionData = async (subscriptionId: string): Promise<Subscription> => {
  try {
    const response = await databases.getDocument(databaseId, subscriptionsCollectionId, subscriptionId);

    if (!response) {
      throw new Error('Subscription not found');
    }

    const course = await getCourseData(response.course);

    const subscription: Subscription = {
      $id: response.$id,
      course: course,
      user: response.user,
      startDate: response.startDate,
    };

    return subscription;
  } catch (error: any) {
    handleError('Failed to fetch subscription data', error);
    // Här returnerar vi aldrig undefined, vi kastar alltid ett fel
    throw new Error('Failed to fetch subscription data');
  }
};


export const countDocumentTypes = (course: any): { [key: string]: number } => {
  const documentTypeCounts: { [key: string]: number } = {
    Examination: 0,
    Summation: 0,
    Notes: 0,
    Assignment: 0,
    Formula_collection: 0
  };

  course.documents.forEach((doc: any) => {
    const documentType = doc.documentType;
    if (documentTypeCounts.hasOwnProperty(documentType)) {
      documentTypeCounts[documentType]++;
    }
  });

  return documentTypeCounts;
};

export const addFavoriteCourse = async (userId: string, courseId: string) => {
  try {
    const user = await getUserData(userId);
    const course = await getCourseData(courseId);

    if (!user.favorite_courses.some(fav => fav.$id === courseId)) {
      user.favorite_courses.push(course);

      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.documentId,
        { favorite_courses: user.favorite_courses }
      );
    }

    return { message: 'Course added to favorites' };
  } catch (error: any) {
    handleError('Failed to add favorite course', error);
    throw new Error('Failed to add favorite course');
  }
};

export const removeFavoriteCourse = async (userId: string, courseId: string) => {
  try {
    const user = await getUserData(userId);

    if (user.favorite_courses.some(fav => fav.$id === courseId)) {
      user.favorite_courses = user.favorite_courses.filter(fav => fav.$id !== courseId);

      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.documentId,
        { favorite_courses: user.favorite_courses }
      );
    }

    return { message: 'Course removed from favorites' };
  } catch (error: any) {
    handleError('Failed to remove favorite course', error);
    throw new Error('Failed to remove favorite course');
  }
};

export const addFavoriteDocument = async (userId: string, document: Document) => {
  try {
    const user = await getUserData(userId);

    if (!user.favorite_documents.some(doc => doc.$id === document.$id)) {
      user.favorite_documents.push(document);

      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.documentId,
        { favorite_documents: user.favorite_documents }
      );
    }

    return { message: 'Document added to favorites' };
  } catch (error: any) {
    console.error('Failed to add favorite document:', error);
    throw new Error('Failed to add favorite document');
  }
};

export const removeFavoriteDocument = async (userId: string, documentId: string) => {
  try {
    const user = await getUserData(userId);

    if (user.favorite_documents.some(doc => doc.$id === documentId)) {
      user.favorite_documents = user.favorite_documents.filter(doc => doc.$id !== documentId);

      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.documentId,
        { favorite_documents: user.favorite_documents }
      );
    }

    return { message: 'Document removed from favorites' };
  } catch (error: any) {
    console.error('Failed to remove favorite document:', error);
    throw new Error('Failed to remove favorite document');
  }
};

export const createApplication = async (applicationData: Application) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      applicationsCollectionId,
      ID.unique(),
      applicationData,
      [
        Permission.read(Role.any()),
        Permission.write(Role.any())
      ]
    );

    return response;
  } catch (error: any) {
    handleError('Failed to create application', error);
    throw new Error('Failed to create application');
  }
};

export const createMessage = async (messageData: Message) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      messagesCollectionId,
      ID.unique(),
      messageData,
      [
        Permission.read(Role.any()),
        Permission.write(Role.any())
      ]
    );

    return response;
  } catch (error: any) {
    console.error('Failed to create message', error);
    throw new Error('Failed to create message');
  }
};