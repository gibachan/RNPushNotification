//
//  NotificationService.swift
//  RNPushNotificationService
//
//  Created by Tatsuyuki Kobayashi on 2020/08/11.
//

import UserNotifications
import UIKit

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
      
      guard let bestAttemptContent = bestAttemptContent else { return }
      
      print(request.content.userInfo)
      
      guard let imageURLString = request.content.userInfo["imageURL"] as? String,
            let imageURL = URL(string: imageURLString) else {
        contentHandler(bestAttemptContent)
        return
      }
      
      URLSession.shared.dataTask(with: imageURL) { (data, response, error) in
        guard let data = data else {
          contentHandler(bestAttemptContent)
          return
        }

        let fileName = imageURL.lastPathComponent
        let writePath = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("\(fileName).png")
        
        do {
          try data.write(to: writePath)
          let attachment = try UNNotificationAttachment(identifier: fileName, url: writePath, options: nil)
          bestAttemptContent.attachments = [attachment]
          contentHandler(bestAttemptContent)
        } catch(let error) {
          print(error.localizedDescription)
          contentHandler(bestAttemptContent)
        }
      }.resume()
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}
